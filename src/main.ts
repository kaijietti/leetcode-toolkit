import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { findElement } from "./lib/utils/elementFinder";
import { CONFIG } from "./lib/config";

import { toKebabCase } from "remeda";
import { state } from "./lib/state";
import { Toaster } from "./lib/utils/toast";
import { GM_registerMenuCommand } from "$";

import { downloadEditorial } from "./lib/editorial-saver";

mount(Toaster, {
    target: document.body,
    props: { richColors: true, position: "top-center" },
});

await state.init();

if (state.site === "global") {
    GM_registerMenuCommand("Download Editorial (Experimental)", () =>
        downloadEditorial()
    );
}

// waiting indefinitely until description tab is loaded AND not hidden
const descriptionTab = await findElement(
    ".flexlayout__tab:has([data-track-load='description_content'])",
    {
        timeout: 0,
        additionalRule: (el) => (el as HTMLElement).style.display !== "none",
    }
);

const titleContainer = await findElement("div:has(> .text-title-large)", {
    parent: descriptionTab,
});
const app = document.createElement("div");
app.setAttribute("id", toKebabCase(CONFIG.APP_NAME));
app.style.cssText = "display: contents;";
titleContainer.parentElement?.before(app);

mount(App, {
    target: app,
});
