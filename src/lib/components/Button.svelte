<!-- @component
https://uiverse.io/krlozCJ/blue-dodo-17
 -->

<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements";
    let {
        children,
        variant = "purple",
        ...restProps
    }: HTMLButtonAttributes & {
        variant?: keyof typeof variants;
    } = $props();

    const variants = {
        purple: "--bg: #6c5ce7; --shadow: #a29bfe",
        green: "--bg: #1ba13e; --shadow: #42de6e",
        orange: "--bg: #ffa116; --shadow: #fedd9b",
    };
</script>

<button style={variants[variant]} {...restProps}>
    {@render children?.()}
</button>

<style>
    button {
        border: none;
        outline: none;
        background-color: var(--bg, #6c5ce7);
        padding: 5px 20px;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        border-radius: 5px;
        transition: all ease 0.1s;
        box-shadow: 0px 3px 0px 0px var(--shadow, #a29bfe);
    }

    button:active {
        transform: translateY(3px);
        box-shadow: 0px 0px 0px 0px var(--shadow, #a29bfe);
    }
</style>
