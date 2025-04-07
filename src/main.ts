import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { ElementFinder } from "./lib/utils/elementFinder";
import { CONFIG } from "./lib/utils/config";

const finder = new ElementFinder([".text-title-large"], {
    onAllFound: ([titleEl]) => {
        const app = document.createElement("div");
        app.setAttribute("id", CONFIG.APP_NAME);
        app.style.cssText = "align-self: center;";
        titleEl.parentElement?.append(app);
        mount(App, { target: app });
    },
});
finder.init();
