<script lang="ts">
    import CopyTitle from "./copy-title.svelte";
    import CopyDescription from "./copy-description.svelte";
    import DownloadAsJupyter from "./download-as-jupyter.svelte";
    import { globalState } from "$lib/state";
    import FindEditorialScreenshot from "./find-editorial-screenshot.svelte";
</script>

<div>
    <CopyTitle />
    <CopyDescription />
    <DownloadAsJupyter />
    {#if globalState.site === "global"}
        <FindEditorialScreenshot />
    {/if}
</div>
