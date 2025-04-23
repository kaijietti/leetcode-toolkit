import { downloadFile } from "./utils/download-file";
import { findElement } from "./utils/elementFinder";
import { htmlToMd, createTurndownService } from "./utils/htmlToMd";
import gmFetch from "@sec-ant/gm-fetch";

const turndown = createTurndownService();
// remove the link before section heading in LeetCode editorials
turndown.addRule("remove-heading-link", {
    filter: (node) =>
        node.nodeName === "A" && node.getAttribute("aria-hidden") === "true",

    replacement: () => "",
});

// save LeetCode Playground Link
turndown.addRule("save-playground-link", {
    filter: ["iframe"],
    replacement: (_content, node) => {
        const link = (node as HTMLIFrameElement).getAttribute("src");
        return link?.includes("playground")
            ? `[LeetCode Playground](${link})`
            : "";
    },
});

// do not process math equation, save html as is
turndown.addRule("save-math-as-is", {
    filter: (node) =>
        node.nodeName === "SPAN" && node.classList.contains("math"),

    replacement: (_content, node) => (node as HTMLSpanElement).outerHTML,
});

function blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
}

const imageCache = new Map<string, string>();

async function prefetchImages(editorialHtml: string) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editorialHtml;
    const images = Array.from(tempDiv.querySelectorAll("img"));

    const fetchPromises = images.map(async (img) => {
        const src = img.src;
        if (!src || src.startsWith("data:") || imageCache.has(src)) {
            return; // Skip if already cached or invalid
        }

        try {
            const response = await gmFetch(src); // cannot use native fetch because of CORS issues
            const blob = await response.blob();
            const dataURL = await blobToDataURL(blob);
            imageCache.set(src, dataURL);
        } catch (err) {
            console.error(`Failed to fetch image: ${src}`, err);
        }
    });
    await Promise.all(fetchPromises);
}

turndown.addRule("convert-img-src-to-base64", {
    filter: (node) => {
        const { src } = node as HTMLImageElement;
        // If no image source or source is already a data URL, don't handle
        if (!src || src.startsWith("data:")) return false;
        return node.tagName === "IMG";
    },
    replacement: (_content, node) => {
        const { src, alt } = node as HTMLImageElement;

        const dataURL = imageCache.get(src);
        if (dataURL) {
            return `![${alt}](${dataURL})`;
        }
        return `![${alt}](${src})`; // Fallback to original URL if not cached
    },
});

export async function scrapeEditorial(): Promise<string> {
    const editorialEl = await findElement(
        ".flexlayout__tab:has(#editorial-quick-navigation) div.WRmCx"
    ); // `div.WRmCx` part is not reliable
    const editorialHtml = editorialEl.innerHTML;

    // Prefetch images before converting to Markdown
    await prefetchImages(editorialHtml);

    const editorial = htmlToMd(editorialEl.innerHTML, turndown);

    // Clear the image cache since we don't need it anymore
    imageCache.clear();

    return editorial;
}

export async function downloadEditorial(editorial: string) {
    const titleEl = await findElement("#editorial-quick-navigation");

    const blob = new Blob([editorial], {
        type: "text/markdown; charset=UTF-8",
    });
    downloadFile(blob, titleEl.textContent ?? "Untitled", "md");
}
