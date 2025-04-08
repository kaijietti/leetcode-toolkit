<script lang="ts">
    import Button from "./lib/components/Button.svelte";
    import { findElement } from "./lib/utils/elementFinder";
    import {
        createNotebook,
        downloadNotebook,
    } from "./lib/utils/jupyter.svelte";
    import { getDescription } from "./copy-description.svelte";
    import { getTitle } from "./copy-title.svelte";
    import { state } from "./lib/utils/state.svelte";

    const getLanguage = async () => {
        const codeEl = await findElement("[data-keybinding-context='1']");
        return codeEl?.getAttribute("data-mode-id") ?? "python";
    };

    async function downloadAsJupyter() {
        const title = await getTitle();
        const notebook = createNotebook({
            title: title,
            description: await getDescription(),
            language: await getLanguage(),
            url: window.location.href,
        });
        downloadNotebook(notebook, title);
    }
</script>

<Button style="color: oklch(51.1% 0.096 186.391)" onclick={downloadAsJupyter}>
    {state.site === "cn"
        ? "下载为 Jupyter Notebook (.ipynb)"
        : "Download as Jupyter Notebook (.ipynb)"}
</Button>
