import TurndownService from "turndown";
import { tables } from "@joplin/turndown-plugin-gfm";
import gmFetch from "@sec-ant/gm-fetch";

function blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(blob);
    });
}

const imageCache = new Map<string, string>();

async function prefetchImages(html: string) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
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

export function createTurndownService() {
    const turndown = new TurndownService({
        emDelimiter: "*",
        bulletListMarker: "-",
    });
    turndown.addRule("pre", {
        filter: ["pre"],
        replacement: (_content, node) =>
            "\n```txt\n" + node.textContent?.trim() + "\n```\n",
    });
    turndown.addRule("superscript", {
        filter: ["sup"],
        replacement: (content) => "^" + content,
    });
    turndown.addRule("paragraph", {
        filter: ["p"],
        replacement: (content) => "\n\n" + content + "\n\n",
    });

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

    turndown.use(tables);

    return turndown;
}

export async function htmlToMd(
    htmlStr: string,
    service = createTurndownService()
) {
    // Prefetch images before converting to Markdown
    await prefetchImages(htmlStr);

    const md = service.turndown(htmlStr);

    // Clear the image cache since we don't need it anymore
    imageCache.clear();

    return md;
}
