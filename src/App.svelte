<script lang="ts">
    import "./app.css";
    import { toast, Toaster } from "./lib/utils/toast";
    import Button from "./lib/components/Button.svelte";
    import { ElementFinder } from "./lib/utils/elementFinder";
    import { copy } from "./lib/utils/copy";
    import { htmlToMd } from "./lib/utils/htmlToMd";

    let titleEl: HTMLElement | null, descEl: HTMLElement | null;
    const finder = new ElementFinder(
        [".text-title-large", "[data-track-load='description_content']"],
        {
            onAllFound([title, desc]) {
                titleEl = title as HTMLElement;
                descEl = desc as HTMLElement;
            },
        }
    );
    finder.init();

    function copyTitle() {
        if (!titleEl) {
            toast.error("Title element not found.");
            return;
        }
        copy(titleEl.innerText);
    }
    function copyDescription() {
        if (!descEl) {
            toast.error("Description element not found.");
            return;
        }
        copy(htmlToMd(descEl));
    }
</script>

<Toaster richColors position="top-center" />

<Button onclick={copyTitle}>Copy Title</Button>
<Button onclick={copyDescription}>Copy Description</Button>
