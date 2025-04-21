import TurndownService from "turndown";
import { tables } from "@joplin/turndown-plugin-gfm";

export function createTurndownService() {
    return (
        new TurndownService({
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
            })
            // convert img link from relative path to absolute path
            .addRule("convert-path-for-img", {
                filter: ["img"],
                replacement: (_content, node) => {
                    // important: directly access DOM property (fully resolved absolute URL)
                    // instead of `getAttribute()` (literal attribute value)
                    const { src, alt } = node as HTMLImageElement;
                    return `![${alt}](${src})`;
                },
            })
            .use(tables)
    ); // parse table
}

export function htmlToMd(
    htmlStr: string | TurndownService.Node,
    service = createTurndownService()
) {
    return service.turndown(htmlStr);
}
