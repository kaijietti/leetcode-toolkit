<script lang="ts">
    import "./app.css";
    import CopyTitle from "./copy-title.svelte";
    import CopyDescription from "./copy-description.svelte";
    import DownloadAsJupyter from "./download-as-jupyter.svelte";
    import { state } from "./lib/state";
    import { toast } from "svelte-sonner";
    import FindEditorialScreenshot from "./find-editorial-screenshot.svelte";

    // format on save
    document.addEventListener("keydown", async () => {
        try {
            await state.editor
                ?.getAction("editor.action.formatDocument")
                ?.run();
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                toast.error("Failed to format code:" + err.message);
            }
        }
    });
</script>

<div>
    <CopyTitle />
    <CopyDescription />
    <DownloadAsJupyter />
    {#if state.site === "global"}
        <FindEditorialScreenshot />
    {/if}
</div>
