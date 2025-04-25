import { mount } from "svelte";
import { toKebabCase } from "remeda";
import { globalState } from "$lib/state";
import { toast } from "$lib/utils/toast";

import { findElement } from "$lib/utils/elementFinder";
import { CONFIG } from "$lib/config";
import Buttons from "./Butttons.svelte";

import { GM_registerMenuCommand } from "$";

import { downloadEditorial, scrapeEditorial } from "$lib/editorial-saver";

import { problemState } from "./state";

async function main() {
    await problemState.patchMonacoEditor();

    if (globalState.site === "global") {
        GM_registerMenuCommand(
            "Download Editorial (Experimental)",
            async () => {
                toast.promise(scrapeEditorial(), {
                    loading: "Scraping Editorial...",
                    success: (editorial) => {
                        downloadEditorial(editorial);
                        return "Start downloading...";
                    },
                    error: "Something went wrong while scraping.",
                });
            }
        );
    }

    // waiting indefinitely until description tab is loaded AND not hidden
    const descriptionTab = await findElement<HTMLDivElement>(
        ".flexlayout__tab:has([data-track-load='description_content'])",
        {
            timeout: 0,
            additionalRule: (el) => el.style.display !== "none",
        }
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
