<script lang="ts">
    import "./app.css";
    import { toast, Toaster } from "./lib/utils/toast";
    import Button from "./lib/components/Button.svelte";
</script>

<Toaster richColors position="top-center" />
<Button onclick={() => toast.info("Button clicked")}>
    <span>Click me</span>
</Button>
