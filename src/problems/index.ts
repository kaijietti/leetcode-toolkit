import { mount } from "svelte";
import { toKebabCase } from "remeda";
import { globalState } from "$lib/state";

import { findElement } from "$lib/utils/elementFinder";
import { CONFIG } from "$lib/config";
import Buttons from "./Butttons.svelte";

import { GM_registerMenuCommand } from "$";

import { downloadEditorial } from "$lib/editorial-saver";

import { problemState } from "./state";
import { simulateMouseClickReact } from "$lib/utils/click";
import { getTitle } from "./copy-title.svelte";

async function main() {
    await problemState.patchMonacoEditor();

    if (globalState.site === "global") {
        async function findProblemEditorial() {
            const editorialTabButton = (
                await findElement("#editorial_tab")
            ).closest(".flexlayout__tab_button");
            if (editorialTabButton) simulateMouseClickReact(editorialTabButton);

            const editorialEl = await findElement<HTMLDivElement>(
                ".flexlayout__tab:has(#editorial-quick-navigation) div.WRmCx",
                {
                    timeout: 2000,
                },
            ); // `div.WRmCx` part is not reliable

            return editorialEl;
        }

        GM_registerMenuCommand("Save Problem Editorial", () =>
            downloadEditorial(findProblemEditorial, getTitle),
        );
    }

    // waiting indefinitely until description tab is loaded AND not hidden
    const descriptionTab = await findElement<HTMLDivElement>(
        ".flexlayout__tab:has([data-track-load='description_content'])",
        {
            timeout: 0,
            additionalRule: (el) => el.style.display !== "none",
        },
    );

    const titleContainer = await findElement("div:has(> .text-title-large)", {
        parent: descriptionTab,
    });
    const buttons = document.createElement("div");
    buttons.setAttribute("id", toKebabCase(CONFIG.APP_NAME));
    buttons.style.cssText = "display: contents;";
    titleContainer.parentElement?.before(buttons);

    mount(Buttons, {
        target: buttons,
    });
}

export { main as problemPage };
