import { GM_registerMenuCommand } from "$";
import { downloadEditorial } from "$lib/editorial-saver";
import { findElement } from "$lib/utils/elementFinder";

function main() {
    async function findExploreEditorial() {
        return await findElement<HTMLDivElement>("div.block-markdown");
    }

    async function getExploreTitle() {
        const titleEl = await findElement("span.content-title");
        return titleEl.textContent?.trim() ?? "";
    }

    GM_registerMenuCommand("Save Explore Article", () =>
        downloadEditorial(findExploreEditorial, getExploreTitle),
    );
}

export { main as explorePage };
