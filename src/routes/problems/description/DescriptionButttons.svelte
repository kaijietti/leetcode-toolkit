<script lang="ts">
    import CopyTitle from "./copy-title.svelte";
    import CopyDescription from "./copy-description.svelte";
    import DownloadAsJupyter from "./download-as-jupyter.svelte";
</script>

<div>
    <CopyTitle />
    <CopyDescription />
    <DownloadAsJupyter />
</div>

<style>
    div {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }
</style>
