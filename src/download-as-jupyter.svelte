<script lang="ts">
    import Button from "./lib/components/Button.svelte";
    import { createNotebook, downloadNotebook } from "./lib/jupyter";
    import { getDescription } from "./copy-description.svelte";
    import { getTitle } from "./copy-title.svelte";
    import { state } from "./lib/state";
    import { toast } from "svelte-sonner";

    const getLanguage = () => {
        return state.editor?.getModel()?.getLanguageId() ?? "python";
    };

    async function downloadAsJupyter() {
        async function scrape() {
            const title = await getTitle();
            const notebook = createNotebook({
                title: title,
                description: await getDescription(),
                language: getLanguage(),
                url: window.location.href,
            });
            return { notebook, title };
        }
        toast.promise(scrape, {
            loading: "Scraping problem description and code...",

            success: ({ notebook, title }) => {
                downloadNotebook(notebook, title);
                return "Start downloading jupyter notebook..";
            },
            error: "Something went wrong.",
        });
    }
</script>

<Button style="color: oklch(51.1% 0.096 186.391)" onclick={downloadAsJupyter}>
    {state.site === "cn"
        ? "下载为 Jupyter Notebook (.ipynb)"
        : "Download as Jupyter Notebook (.ipynb)"}
</Button>
