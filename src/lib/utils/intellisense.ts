import type { editor } from "monaco-editor";
import { state } from "./state.svelte";
import { unsafeWindow } from "$";

interface MonacoEditorOptions extends editor.IEditorOptions {
    "bracketPairColorization.enabled": boolean;
}

const overrideOptions: MonacoEditorOptions = {
    selectionHighlight: true,
    parameterHints: { enabled: true },
    hover: { enabled: true },
    quickSuggestions: true,
    suggestOnTriggerCharacters: true,
    "bracketPairColorization.enabled": true,
};

export async function waitForMonaco(): Promise<void> {
    return new Promise((resolve) => {
        function patchAndResolve() {
            // @ts-expect-error: monaco is supplied by LeetCode site itself.
            const editor = unsafeWindow.monaco?.editor.getEditors()[0];
            if (!editor) {
                console.error("Monaco editor not found.");
                return;
            }
            state.editor = editor;
            patchMonaco();
            resolve();
        }

        // If editor is already loaded, resolve immediately
        patchAndResolve();

        // otherwise, wait for the Monaco script to load
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const addedNodes = Array.from(mutation.addedNodes);
                const monacoScript = addedNodes.find(
                    (node) =>
                        node instanceof HTMLScriptElement &&
                        node.src.includes("monaco")
                );

                if (monacoScript) {
                    monacoScript.addEventListener("load", () => {
                        console.log("Monaco editor loaded.");
                        observer.disconnect();
                        patchAndResolve();
                    });
                }
            }
        });

        observer.observe(document.head, { childList: true });
        console.log("Waiting for Monaco editor to load...");
    });
}

function patchMonaco(): void {
    const { editor } = state;
    if (!editor)
        throw new Error(
            "Monaco Editor not found, cannot patch with IntelliSense."
        );

    const originalUpdateOptions = editor.updateOptions.bind(editor);
    editor.updateOptions = (options: MonacoEditorOptions): void => {
        originalUpdateOptions({
            ...options,
            ...overrideOptions,
        });
    };
}
