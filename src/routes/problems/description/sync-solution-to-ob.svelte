<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { globalState } from "$lib/state";
    import { toast } from "$lib/utils/toast";
    import { getCode, getObsidianPath, getTags, getTitle } from "./leetcode-info.svelte";

    function extractMethodFromCode(code: string): string {
        const match = code.match(/###\s*解法[:：]\s*(.+)/);
        return match ? match[1].trim() : "";
    }

    async function saveToObsidian() {
        let title = await getTitle();
        let {code, language} = getCode();

        // 合法性检查
        if (!title) {
            toast.error("获取标题失败，请检查标题格式");
            return;
        }
        if (!code) {
            toast.error("获取代码失败，请检查代码格式");
            return;
        }
        if (!language) {
            toast.error("获取语言失败，请检查语言格式");
            return;
        }

        let method = extractMethodFromCode(code);
        if (!method) {
            toast.error("获取解法失败，请检查解法格式");
            return;
        }
        
        // 获取当前题目的链接
        const currentUrl = window.location.href;

        const content = `## [${title}](${currentUrl})
[[${title}]]
## Code
\`\`\`${language}
${code}
\`\`\`
`;

        const {vaultName, problemFolder, newTitle} = await getObsidianPath(title);
        const filepath = `${problemFolder}/${newTitle}-${method}.md`;

        const uri = `obsidian://advanced-uri?vault=${encodeURIComponent(vaultName)}&filepath=${encodeURIComponent(filepath)}&data=${encodeURIComponent(content)}&mode=new`;
        window.location.href = uri;
    }
</script>

<Button variant="orange" onclick={saveToObsidian}>
    {globalState.site === "cn" ? "同步当前答案到Ob" : "Sync Solution to Ob"}
</Button>