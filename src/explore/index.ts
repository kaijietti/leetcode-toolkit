import { GM_registerMenuCommand } from "$";
import { downloadEditorial } from "$lib/editorial-saver";
import { findElement } from "$lib/utils/elementFinder";
import { getElementIndex } from "$lib/utils/elementIndex";

function main() {
    async function findExploreEditorial() {
        return await findElement<HTMLDivElement>("div.block-markdown");
    }

    async function getExploreTitle() {
        const tocContainer = await findElement(
            "div.list-group:not(.item-list-group)",
        );

        const titleContainer = tocContainer.querySelector(
            ".list-group-item .selected",
        );
        if (!titleContainer) {
            throw new Error("Title container not found");
        }

        const title =
            titleContainer.querySelector(".title")?.textContent?.trim() ?? "";

        const articleNumber = getElementIndex(titleContainer) + 1;

        const chapterEl = titleContainer.closest("div.chapter-item");
        if (!chapterEl) {
            throw new Error("Chapter not found");
        }

        const chapterNumber = getElementIndex(chapterEl);

        return `${chapterNumber}.${articleNumber} - ${title}`;
    }

    GM_registerMenuCommand("Save Explore Article", () =>
        downloadEditorial(findExploreEditorial, getExploreTitle),
    );
}

export { main as explorePage };
