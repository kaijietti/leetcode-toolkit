<script lang="ts" module>
    export const getDescription = async () => {
        const el = await findElement("[data-track-load='description_content']");
        return htmlToMd(el.innerHTML);
    };
</script>

<script lang="ts">
    import Button from "./lib/components/Button.svelte";
    import { copy } from "./lib/utils/copy.svelte";
    import { findElement } from "./lib/utils/elementFinder";
    import { htmlToMd } from "./lib/utils/htmlToMd";
    import { state } from "./lib/state.svelte";

    async function copyDescription() {
        copy(await getDescription());
    }
</script>

<Button onclick={copyDescription}>
    {state.site === "cn" ? "复制描述" : "Copy Description"}
</Button>
