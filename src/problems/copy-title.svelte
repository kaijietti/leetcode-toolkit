<script lang="ts" module>
    export const getTitle = async () =>
        (await findElement(".text-title-large")).textContent ?? "";
</script>

<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { findElement } from "$lib/utils/elementFinder";
    import { copy } from "$lib/utils/copy";
    import { globalState } from "$lib/state";

    async function copyTitle() {
        copy(await getTitle());
    }
</script>

<Button onclick={copyTitle}>
    {globalState.site === "cn" ? "复制标题" : "Copy Title"}
</Button>
