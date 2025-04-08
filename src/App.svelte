<script lang="ts">
    import "./app.css";
    import CopyTitle from "./copy-title.svelte";
    import CopyDescription from "./copy-description.svelte";
    import DownloadAsJupyter from "./download-as-jupyter.svelte";
    import { findElement } from "./lib/utils/elementFinder";

    // format on save
    document.addEventListener("keydown", async (e) => {
        const formatBtn = (await findElement(
            "div.flex.items-center.gap-1 > button:nth-child(1)",
            { timeout: 500 }
        )) as HTMLButtonElement;
        if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            formatBtn.click();
            console.log("Format button clicked");
        }
    });
</script>

<div>
    <CopyTitle />
    <CopyDescription />
    <DownloadAsJupyter />
</div>
