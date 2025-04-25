import { downloadFile } from "./utils/download-file";
import { findElement } from "./utils/elementFinder";
import { htmlToMd, createTurndownService } from "./utils/htmlToMd";

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

const playgroundCache = new Map<string, string>();
function prefetchPlayground(editorialEl: HTMLDivElement) {
    const iframes = editorialEl.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
        const { src, contentDocument } = iframe;
        if (!src.includes("playground")) return;

        const langTab = contentDocument?.querySelector("div.lang-btn-set");
        const textarea = contentDocument?.querySelector<HTMLTextAreaElement>(
            "textarea[name='lc-codemirror']"
        );

        let result = `<MixedCodeBlock> \n\n`;
        Array.from(
            langTab?.children as HTMLCollectionOf<HTMLButtonElement>
        ).forEach(async (button) => {
            let lang = button.textContent?.toLowerCase();
            if (lang === "python3") lang = "python";
            button.click();

            const code = textarea?.textContent;
            result += `\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
        });
        result += `</MixedCodeBlock>`;
        playgroundCache.set(src, result);
    });
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
    const editorialEl = await findElement<HTMLDivElement>(
        ".flexlayout__tab:has(#editorial-quick-navigation) div.WRmCx"
    ); // `div.WRmCx` part is not reliable

    prefetchPlayground(editorialEl);

    const editorial = await htmlToMd(editorialEl.innerHTML, turndown);

    playgroundCache.clear();

    return editorial;
}

export async function downloadEditorial(editorial: string) {
    const titleEl = await findElement<HTMLDivElement>(
        "#editorial-quick-navigation"
    );
    const title = titleEl.innerText;

    const blob = new Blob([`# ${title}\n\n`, editorial], {
        type: "text/markdown; charset=UTF-8",
    });
    downloadFile(blob, titleEl.textContent ?? "Untitled", "md");
}
