<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    let { children, ...restProps }: HTMLButtonAttributes = $props();
</script>

<button
    {...restProps}
    class="relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80"
>
    {@render children?.()}
</button>
