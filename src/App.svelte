<script lang="ts">
    import "./app.css";
    import { Toaster } from "./lib/utils/toast";
    import Button from "./lib/components/Button.svelte";
    import { findElement } from "./lib/utils/elementFinder";
    import { copy } from "./lib/utils/copy";
    import { htmlToMd } from "./lib/utils/htmlToMd";
    import { createNotebook, downloadNotebook } from "./lib/utils/jupyter";

    const getTitle = async () =>
        (await findElement(".text-title-large")).textContent ?? "";
    let getDescription = async () => {
        const el = await findElement("[data-track-load='description_content']");
        return htmlToMd(el.innerHTML);
    };
    const getLanguage = async () => {
        const codeEl = await findElement("[data-keybinding-context='1']");
        return codeEl?.getAttribute("data-mode-id") ?? "python";
    };

    async function copyTitle() {
        copy(await getTitle());
    }
    async function copyDescription() {
        copy(await getDescription());
    }

    async function downloadAsJupyter() {
        const title = await getTitle();
        const notebook = createNotebook({
            title: title,
            description: await getDescription(),
            language: await getLanguage(),
        });
        downloadNotebook(notebook, title);
    }
</script>

<Toaster richColors position="top-center" />

<div>
    <Button onclick={copyTitle}>Copy Title</Button>
    <Button onclick={copyDescription}>Copy Description</Button>
    <Button onclick={downloadAsJupyter}
        >Download as Jupyter Notebook (.ipynb)</Button
    >
</div>
