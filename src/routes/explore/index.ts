import { findElement } from "$lib/utils/elementFinder";
import { mount } from "svelte";
import SaveExploreArticle from "./save-explore-article.svelte";

async function main() {
    const toolbar = await findElement("div.left-side", { timeout: 0 });

    const container = document.createElement("div");
    container.style.cssText = "display: contents;";
    toolbar.append(container);
    mount(SaveExploreArticle, {
        target: container,
    });
}

export { main as explorePage };
