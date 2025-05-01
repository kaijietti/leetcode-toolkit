<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { createNotebook, downloadNotebook } from "$lib/jupyter";
    import { getDescription } from "./copy-description.svelte";
    import { getTitle } from "./copy-title.svelte";
    import { globalState } from "$lib/state";
    import { problemState } from "../state";
    import { toast } from "svelte-sonner";

    async function saveAsJupyter() {
        async function scrape() {
            const title = await getTitle();
            const notebook = createNotebook({
                title: title,
                description: await getDescription(),
                code: problemState.editor?.getModel()?.getValue() ?? "",
                language:
                    problemState.editor?.getModel()?.getLanguageId() ??
                    "python",
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

<Button variant="orange" onclick={saveAsJupyter}>
    {globalState.site === "cn"
        ? "保存为 Jupyter Notebook (.ipynb)"
        : "Save as Jupyter Notebook (.ipynb)"}
</Button>
