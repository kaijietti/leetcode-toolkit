import { state } from "../state.svelte";
import { toast } from "./toast";

export function downloadFile(blob: Blob, filename: string, extension: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename + "." + extension;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(state.site === "cn" ? "开始下载……" : "Start downloading...");
}
