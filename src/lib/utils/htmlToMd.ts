import TurndownService from "turndown";

const turndownService = new TurndownService({
    emDelimiter: "*",
    bulletListMarker: "-",
});
turndownService.addRule("pre", {
    filter: ["pre"],
    replacement: (content, node) =>
        "\n```txt\n" + node.textContent?.trim() + "\n```\n",
});
turndownService.addRule("superscript", {
    filter: ["sup"],
    replacement: (content) => "^" + content,
});
turndownService.addRule("paragraph", {
    filter: ["p"],
    replacement: (content) => "\n\n" + content + "\n\n",
});

export function htmlToMd(htmlStr: string | TurndownService.Node) {
    return turndownService.turndown(htmlStr);
}
