import type { editor } from "monaco-editor";

class State {
    site: "global" | "cn" = "global";
    editor: editor.ICodeEditor | null = null;

    init() {
        const hostname = window.location.hostname;
        this.site = hostname === "leetcode.cn" ? "cn" : "global";

        // @ts-expect-error: monaco is supplied by LeetCode site itself.
        this.editor = monaco.editor.getEditors()[0] as editor.ICodeEditor;
    }
}

export const state = new State();
