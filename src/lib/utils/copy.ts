import { toast } from "./toast";
import type { LeetCodeSite } from "./types";

export async function copy(text: string, site: LeetCodeSite = "global") {
    try {
        await navigator.clipboard.writeText(text);
        toast.success(site === "cn" ? "复制到剪贴板!" : "Copied to clipboard!");
    } catch (err) {
        if (err instanceof Error) {
            const errorMessage = site === "cn" ? "复制失败" : "Failed to copy";
            toast.error(errorMessage + ": " + err.message);
            console.error(errorMessage + err);
        } else throw err;
    }
}
