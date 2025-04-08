import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";
import { findElement } from "./lib/utils/elementFinder";
import { CONFIG } from "./lib/utils/config";

import { toKebabCase } from "remeda";

const titleContainer = await findElement("div:has(> .text-title-large)");
const app = document.createElement("div");
app.setAttribute("id", toKebabCase(CONFIG.APP_NAME));
app.style.cssText = "display: contents;";
titleContainer.parentElement?.parentElement?.insertBefore(
    app,
    titleContainer.parentElement
);

const hostname = window.location.hostname;

mount(App, {
    target: app,
    props: {
        site: hostname === "leetcode.cn" ? "cn" : "global",
    },
});
