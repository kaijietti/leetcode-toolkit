import TurndownService from "turndown";

export function createTurndownService() {
    return new TurndownService({
        emDelimiter: "*",
        bulletListMarker: "-",
    })
        .addRule("pre", {
            filter: ["pre"],
            replacement: (_content, node) =>
                "\n```txt\n" + node.textContent?.trim() + "\n```\n",
        })
        .addRule("superscript", {
            filter: ["sup"],
            replacement: (content) => "^" + content,
        })
        .addRule("paragraph", {
            filter: ["p"],
            replacement: (content) => "\n\n" + content + "\n\n",
        });
}

export function htmlToMd(
    htmlStr: string | TurndownService.Node,
    service = createTurndownService()
) {
    return service.turndown(htmlStr);
}
