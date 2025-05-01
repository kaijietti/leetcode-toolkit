import { findElement } from "$lib/utils/elementFinder";

import { GM_registerMenuCommand } from "$";

import { downloadEditorial } from "$lib/editorial-saver";

import { simulateMouseClickReact } from "$lib/utils/click";
import { getTitle } from "../description/copy-title.svelte";

export async function initEditorialTab() {
    GM_registerMenuCommand("Save Problem Editorial", () =>
        downloadEditorial(findProblemEditorial, getTitle),
    );
}

async function findProblemEditorial() {
    const editorialTabButton = (await findElement("#editorial_tab")).closest(
        ".flexlayout__tab_button",
    );
    if (editorialTabButton) simulateMouseClickReact(editorialTabButton);

    const editorialEl = await findElement<HTMLDivElement>(
        ".flexlayout__tab:has(#editorial-quick-navigation) div.WRmCx",
        {
            timeout: 2000,
        },
    ); // `div.WRmCx` part is not reliable

    return editorialEl;
}
