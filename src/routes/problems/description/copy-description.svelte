<script lang="ts" module>
    export const getDescription = async (convertImage = true) => {
        const el = await findElement<HTMLDivElement>(
            "div[data-track-load='description_content']",
        );
        return htmlToMd(el, { convertImage });
    };
</script>

<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { copy } from "$lib/utils/copy";
    import { findElement } from "$lib/utils/elementFinder";
    import { htmlToMd } from "$lib/utils/htmlToMd";
    import { globalState } from "$lib/state";
    import { toast } from "$lib/utils/toast";

    async function copyDescription() {
        const toastId = toast.loading("Scraping problem description...");
        const desc = await getDescription(false);
        copy(desc, toastId);
    }
</script>

<Button onclick={copyDescription}>
    {globalState.site === "cn" ? "复制描述" : "Copy Description"}
</Button>
