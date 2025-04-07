<script lang="ts">
    import "./app.css";
    import { toast, Toaster } from "./lib/utils/toast";
    import Button from "./lib/components/Button.svelte";
    import { ElementFinder } from "./lib/utils/elementFinder";
    import { copy } from "./lib/utils/copy";
    import { htmlToMd } from "./lib/utils/htmlToMd";
    import { createNotebook } from "./lib/utils/jupyter";

    let titleEl: HTMLElement | null;
    let descEl: HTMLElement | null;
    let codeEl: HTMLElement | null;
    const finder = new ElementFinder(
        [
            ".text-title-large",
            "[data-track-load='description_content']",
            "[data-keybinding-context='1']",
        ],
        {
            onAllFound([title, desc, code]) {
                titleEl = title as HTMLElement;
                descEl = desc as HTMLElement;
                codeEl = code as HTMLElement;
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

    function copyAsJupyter() {
        if (!titleEl || !descEl) {
            toast.error("elements not found.");
            return;
        }
        const notebook = createNotebook({
            title: titleEl.innerText,
            description: htmlToMd(descEl.innerHTML),
            language: codeEl?.getAttribute("data-mode-id") || "python",
        });
        copy(JSON.stringify(notebook));
    }
</script>

<Toaster richColors position="top-center" />

<div>
    <Button onclick={copyTitle}>Copy Title</Button>
    <Button onclick={copyDescription}>Copy Description</Button>
    <Button onclick={copyAsJupyter}>Copy as Jupyter</Button>
</div>
