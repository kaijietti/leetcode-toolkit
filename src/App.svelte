<script lang="ts">
    import "./app.css";
    import { Toaster } from "./lib/utils/toast";
    import CopyTitle from "./copy-title.svelte";
    import CopyDescription from "./copy-description.svelte";
    import DownloadAsJupyter from "./download-as-jupyter.svelte";
</script>

<Toaster richColors position="top-center" />

<div>
    <CopyTitle />
    <CopyDescription />
    <DownloadAsJupyter />
</div>
