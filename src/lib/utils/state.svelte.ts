import type { editor } from "monaco-editor";
import { waitForMonaco } from "./intellisense";

class State {
    site: "global" | "cn" = "global";
    editor: editor.ICodeEditor | null = null;

    async init() {
        const hostname = window.location.hostname;
        this.site = hostname === "leetcode.cn" ? "cn" : "global";

        await waitForMonaco();
    }
}

export const state = new State();
