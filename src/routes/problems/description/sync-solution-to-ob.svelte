<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { globalState } from "$lib/state";
    import { toast } from "$lib/utils/toast";
    import { getCode, getObsidianPath, getTitle, getTags, getDifficulty } from "./leetcode-info.svelte";

    function extractMethodFromCode(code: string): string {
        const match = code.match(/###\s*解法[:：]\s*(.+)/);
        return match ? match[1].trim() : "";
    }

    function extractMethodClassification(code: string): string {
        const match = code.match(/###\s*分类[:：]\s*(.+)/);
        return match ? match[1].trim() : "";
    }

    async function saveToObsidian() {
        let title = await getTitle();
        let { code, language } = getCode();
        let difficulty = await getDifficulty();

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

        if (!difficulty) {
            toast.error("获取难度失败，请检查难度格式");
            return;
        }

        let method = extractMethodFromCode(code);
        if (!method) {
            toast.error("获取解法失败，请检查解法格式");
            return;
        }

        let classification = extractMethodClassification(code);
        if (!classification) {
            toast.error("获取分类失败，请检查分类格式");
            return;
        }

        let tags = await getTags();
        // 增加我们的自定义标签
        tags.push("LeetCode");
        tags.push("LeetCode-难度-" + difficulty);
        tags.push("LeetCode-解法-" + method);
        tags.push("LeetCode-分类-" + classification);
        // 将tags按照 "#{tag}" 的方式构造，然后空格拼接，从而形成ob可以识别的格式
        const tagString = tags.map((tag) => `#${tag}`).join(" ");

        // 获取当前题目的链接
        const currentUrl = window.location.href;
        // advanced-uri 貌似会对内容进行两次decodeURIComponent，如果代码里面有 % 会导致问题，比如取模运算。
        // 这里对代码进行二次编码，避免问题。
        const safeCode = encodeURIComponent(code);
        const content = `## [${title}](${currentUrl})
[[${title}]]
${tagString}
## Code
\`\`\`${language}
${safeCode}
\`\`\`
`;

        const { vaultName, problemFolder, newTitle } =
            await getObsidianPath(title);
        const filepath = `${problemFolder}/${newTitle}-${method}.md`;

        const uri = `obsidian://advanced-uri?vault=${encodeURIComponent(vaultName)}&filepath=${encodeURIComponent(filepath)}&data=${encodeURIComponent(content)}&mode=new`;
        window.location.href = uri;
    }
</script>

<Button variant="orange" onclick={saveToObsidian}>
    {globalState.site === "cn" ? "同步当前答案到Ob" : "Sync Solution to Ob"}
</Button>
