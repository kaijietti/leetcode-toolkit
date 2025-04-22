import type { editor } from "monaco-editor";
import { findMonacoEditor, patchMonaco } from "./intellisense";

class State {
    site: "global" | "cn" = "global";
    editor: editor.ICodeEditor | null = null;

    async init() {
        const hostname = window.location.hostname;
        this.site = hostname === "leetcode.cn" ? "cn" : "global";

        this.editor = await findMonacoEditor();
        patchMonaco(this.editor);
    }
}

export const state = new State();
