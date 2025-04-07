import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { ElementFinder } from "./lib/utils/elementFinder";
import { CONFIG } from "./lib/utils/config";

const finder = new ElementFinder(["div:has(> .text-title-large)"], {
    onAllFound: ([titleContainer]) => {
        const app = document.createElement("div");
        app.setAttribute("id", CONFIG.APP_NAME);
        app.style.cssText = "display: contents;";
        titleContainer.parentElement?.parentElement?.insertBefore(
            app,
            titleContainer.parentElement
        );
        mount(App, { target: app });
    },
});
finder.init();
