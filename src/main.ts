import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { ElementFinder } from "./lib/utils/elementFinder";
import { toast } from "svelte-sonner";
import { CONFIG } from "./lib/utils/config";

const finder = new ElementFinder([".text-title-large"], {
    onAllFound: ([titleEl]) => {
        const app = document.createElement("div");
        app.setAttribute("id", CONFIG.APP_NAME);
        titleEl.parentElement!.append(app);
        mount(App, { target: app });
    },
    onError: (error) => {
        console.error("Error finding elements:", error);
        toast.error("Error finding elements: " + error.message);
    },
});
finder.init();
