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

// save LeetCode Playground Link
turndown.addRule("save-playground-link", {
    filter: ["iframe"],
    replacement: (_content, node) => {
        const link = (node as HTMLIFrameElement).getAttribute("src");
        return link?.includes("playground")
            ? `[LeetCode Playground](${link})`
            : "";
    },
});

// do not process math equation, save html as is
turndown.addRule("save-math-as-is", {
    filter: (node) =>
        node.nodeName === "SPAN" && node.classList.contains("math"),

    replacement: (_content, node) => (node as HTMLSpanElement).outerHTML,
});

export async function downloadEditorial() {
    const titleEl = await findElement("#editorial-quick-navigation");
    const editorialEl = await findElement(
        ".flexlayout__tab:has(#editorial-quick-navigation) div.WRmCx"
    ); // `div.WRmCx` part is not reliable
    const editorial = htmlToMd(editorialEl.innerHTML, turndown);
    const blob = new Blob([editorial], {
        type: "text/markdown; charset=UTF-8",
    });
    downloadFile(blob, titleEl.textContent ?? "Untitled", "md");
}
