import { toast } from "./toast";
import { state } from "./state.svelte";

export async function copy(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        toast.success(
            state.site === "cn" ? "复制到剪贴板!" : "Copied to clipboard!"
        );
    } catch (err) {
        if (err instanceof Error) {
            const errorMessage =
                state.site === "cn" ? "复制失败" : "Failed to copy";
            toast.error(errorMessage + ": " + err.message);
            console.error(errorMessage + err);
        } else throw err;
    }
}
