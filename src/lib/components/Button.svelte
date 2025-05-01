<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    let {
        children,
        variant = "description",
        class: className,
        ...restProps
    }: HTMLButtonAttributes & {
        variant?: "description" | "editorial";
    } = $props();

    const variantClasses = {
        description:
            "relative inline-flex items-center justify-center text-caption px-2 py-1 gap-1 rounded-full bg-fill-secondary cursor-pointer transition-colors hover:bg-fill-primary hover:text-text-primary text-sd-secondary-foreground hover:opacity-80",
        editorial:
            "rounded-lg px-4 py-[5px] font-medium bg-brand-orange text-white hover:text-white",
    };
</script>

<button class={[variantClasses[variant], className]} {...restProps}>
    {@render children?.()}
</button>
