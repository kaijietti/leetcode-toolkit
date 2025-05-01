import { findElement } from "$lib/utils/elementFinder";
import { mount } from "svelte";
import EditorialButtons from "./EditorialButtons.svelte";
import { toKebabCase } from "remeda";
import { CONFIG } from "$lib/config";

export async function initEditorialTab() {
    const editorialTab = await findElement<HTMLDivElement>(
        ".flexlayout__tab:has(a[href^='/subscribe'], #editorial-quick-navigation)",
        {
            timeout: 0,
            additionalRule: (el) => el.style.display !== "none",
        },
    );

    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.cssText = "display: contents;";
    buttonsContainer.setAttribute(
        "id",
        toKebabCase(CONFIG.APP_NAME) + "-description",
    );

    editorialTab.prepend(buttonsContainer);
    mount(EditorialButtons, {
        target: buttonsContainer,
    });
}
