<script lang="ts">
    import Button from "./lib/components/Button.svelte";
    import { createNotebook, downloadNotebook } from "./lib/jupyter.svelte";
    import { getDescription } from "./copy-description.svelte";
    import { getTitle } from "./copy-title.svelte";
    import { state } from "./lib/state.svelte";

    const getLanguage = () => {
        return state.editor?.getModel()?.getLanguageId() ?? "python";
    };

    async function downloadAsJupyter() {
        const title = await getTitle();
        const notebook = createNotebook({
            title: title,
            description: await getDescription(),
            language: getLanguage(),
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
