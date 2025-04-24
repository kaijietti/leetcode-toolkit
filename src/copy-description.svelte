<script lang="ts" module>
    export const getDescription = async () => {
        const el = await findElement("[data-track-load='description_content']");
        return htmlToMd(el.innerHTML);
    };
</script>

<script lang="ts">
    import Button from "./lib/components/Button.svelte";
    import { copy } from "./lib/utils/copy";
    import { findElement } from "./lib/utils/elementFinder";
    import { htmlToMd } from "./lib/utils/htmlToMd";
    import { state } from "./lib/state";
    import { toast } from "./lib/utils/toast";

    async function copyDescription() {
        const toastId = toast.loading("Scraping problem description...");
        const desc = await getDescription();
        copy(desc, toastId);
    }
</script>

<Button onclick={copyDescription}>
    {state.site === "cn" ? "复制描述" : "Copy Description"}
</Button>
