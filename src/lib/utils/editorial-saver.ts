import { downloadFile } from "./download-file";
import { findElement } from "./elementFinder";
import { htmlToMd, createTurndownService } from "./htmlToMd";

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

export async function downloadEditorial() {
    const titleEl = await findElement("#editorial-quick-navigation");
    const editorialEl = await findElement(
        "[data-layout-path='/ts0/t1'] div.WRmCx"
    ); // this selector is not reliable
    const editorial = htmlToMd(editorialEl.innerHTML, turndown);
    const blob = new Blob([editorial], {
        type: "text/markdown; charset=UTF-8",
    });
    downloadFile(blob, titleEl.textContent ?? "Untitled", "md");
}
