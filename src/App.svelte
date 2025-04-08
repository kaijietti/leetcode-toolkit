<script lang="ts">
    import "./app.css";
    import { Toaster } from "./lib/utils/toast";
    import Button from "./lib/components/Button.svelte";
    import { findElement } from "./lib/utils/elementFinder";
    import { copy } from "./lib/utils/copy";
    import { htmlToMd } from "./lib/utils/htmlToMd";
    import { createNotebook, downloadNotebook } from "./lib/utils/jupyter";
    import type { LeetCodeSite } from "./lib/utils/types";

    let { site = "global" }: { site: LeetCodeSite } = $props();

    const getTitle = async () =>
        (await findElement(".text-title-large")).textContent ?? "";
    const getDescription = async () => {
        const el = await findElement("[data-track-load='description_content']");
        return htmlToMd(el.innerHTML);
    };
    const getLanguage = async () => {
        const codeEl = await findElement("[data-keybinding-context='1']");
        return codeEl?.getAttribute("data-mode-id") ?? "python";
    };

    async function copyTitle() {
        copy(await getTitle(), site);
    }
    async function copyDescription() {
        copy(await getDescription(), site);
    }

    async function downloadAsJupyter() {
        const title = await getTitle();
        const notebook = createNotebook({
            title: title,
            description: await getDescription(),
            language: await getLanguage(),
            url: window.location.href,
            site,
        });
        downloadNotebook(notebook, title, site);
    }
</script>

<Toaster richColors position="top-center" />

<div>
    <Button onclick={copyTitle}>
        {site === "cn" ? "复制标题" : "Copy Title"}
    </Button>
    <Button onclick={copyDescription}>
        {site === "cn" ? "复制描述" : "Copy Description"}
    </Button>
    <Button
        style="color: oklch(51.1% 0.096 186.391)"
        onclick={downloadAsJupyter}
        >{site === "cn"
            ? "下载为 Jupyter Notebook (.ipynb)"
            : "Download as Jupyter Notebook (.ipynb)"}</Button
    >
</div>
