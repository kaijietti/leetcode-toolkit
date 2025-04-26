import { getTitle } from "src/problems/copy-title.svelte";
import { simulateMouseClickReact } from "./utils/click";
import { downloadFile } from "./utils/download-file";
import { findElement } from "./utils/elementFinder";
import { htmlToMd, createTurndownService } from "./utils/htmlToMd";
import { toast } from "./utils/toast";

const turndown = createTurndownService();
// remove the link before section heading in LeetCode editorials
turndown.addRule("remove-heading-link", {
    filter: (node) =>
        node.nodeName === "A" && node.getAttribute("aria-hidden") === "true",
    replacement: () => "",
});

// do not process math equation, save html as is
turndown.addRule("save-math-as-is", {
    filter: (node) =>
        node.nodeName === "SPAN" && node.classList.contains("math"),
    replacement: (_content, node) => (node as HTMLSpanElement).outerHTML,
});

function waitForMyIframeToReload(iframe: HTMLIFrameElement) {
    return new Promise((resolve) => {
        if (iframe.contentDocument?.readyState === "complete") {
            resolve(undefined);
        } else {
            iframe.addEventListener("load", resolve);
        }
    });
}

const playgroundCache = new Map<string, string>();
async function prefetchPlayground(editorialEl: HTMLDivElement) {
    const iframes = editorialEl.querySelectorAll("iframe");
    const promises = Array.from(iframes).map(async (iframe) => {
        await waitForMyIframeToReload(iframe);
        const { src, contentDocument } = iframe;
        if (!src.includes("playground")) return;

        const langTab = await findElement("div.lang-btn-set", {
            parent: contentDocument!,
        });
        const textarea = contentDocument?.querySelector<HTMLTextAreaElement>(
            "textarea[name='lc-codemirror']"
        );

        let result = `<MixedCodeBlock> \n\n`;
        Array.from(
            langTab.children as HTMLCollectionOf<HTMLButtonElement>
        ).forEach((button) => {
            let lang = button.textContent?.toLowerCase();
            if (lang === "python3") lang = "python";
            button.click();

            const code = textarea?.textContent;
            result += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
        });
        result += `</MixedCodeBlock>`;
        playgroundCache.set(src, result);
    });
    await Promise.all(promises);
}

// save LeetCode Playground Link
turndown.addRule("save-code-playground", {
    filter: ["iframe"],
    replacement: (_content, node) => {
        const { src } = node as HTMLIFrameElement;
        if (!src.includes("playground")) return ""; // skip iframe that aren't playground (videos, etc.)
        return (
            `[LeetCode Playground](${src})\n\n` +
            (playgroundCache.get(src) ?? "")
        );
    },
});

export async function scrapeEditorial(): Promise<string> {
    const editorialTabButton = (await findElement("#editorial_tab")).closest(
        ".flexlayout__tab_button"
    );
    if (editorialTabButton) simulateMouseClickReact(editorialTabButton);

    const editorialEl = await findElement<HTMLDivElement>(
        ".flexlayout__tab:has(#editorial-quick-navigation) div.WRmCx",
        {
            timeout: 2000,
        }
    ); // `div.WRmCx` part is not reliable

    await prefetchPlayground(editorialEl);

    const editorial = await htmlToMd(editorialEl.innerHTML, turndown);

    playgroundCache.clear();

    return editorial;
}

export async function downloadEditorial() {
    toast.promise(
        async () => {
            return {
                editorial: await scrapeEditorial(),
                title: await getTitle(),
            };
        },
        {
            loading: "Scraping Editorial...",
            success: ({ editorial, title }) => {
                const blob = new Blob([`# ${title}\n\n`, editorial], {
                    type: "text/markdown; charset=UTF-8",
                });
                downloadFile(blob, title, "md");
                return "Start downloading...";
            },
            error: (err) => {
                console.error(err);
                return "Something went wrong while scraping.";
            },
        }
    );
}
