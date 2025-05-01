<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { getTitle } from "../description/copy-title.svelte";
    import { extractScreenshotLink } from "$lib/editorial-screenshot";
    import { toast } from "svelte-sonner";

    async function goToEditorialScreenshot() {
        const title = await getTitle();
        const link = extractScreenshotLink(title);
        if (link) {
            window.open(link, "_blank");
        } else {
            toast.warning(
                `Editorial screenshot not found for problem: ${title}`
            );
        }
    }
</script>

<Button style="color: rgb(255, 161, 22)" onclick={goToEditorialScreenshot}>
    Find Editorial
</Button>
