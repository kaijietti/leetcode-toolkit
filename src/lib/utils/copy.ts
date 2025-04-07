import { toast } from "./toast";

export async function copy(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    } catch (err) {
        if (err instanceof Error) {
            toast.error("Failed to copy to clipboard: " + err.message);
            console.error("Failed to copy to clipboard: " + err);
        } else throw err;
    }
}
