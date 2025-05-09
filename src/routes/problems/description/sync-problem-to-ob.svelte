<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { globalState } from "$lib/state";
    import { getDescription } from "./copy-description.svelte";
    import { toast } from "$lib/utils/toast";
    import { getObsidianPath, getTags, getTitle } from "./leetcode-info.svelte";
    import { getDifficulty } from "./leetcode-info.svelte";

    async function saveToObsidian() {
        let title = await getTitle();
        const description = await getDescription();
        const difficulty = await getDifficulty();

        // 合法性检查
        if (!title) {
            toast.error("获取标题失败，请检查标题格式");
            return;
        }
        if (!description) {
            toast.error("获取描述失败，请检查描述格式");
            return;
        }
        if (!difficulty) {
            toast.error("获取难度失败，请检查难度格式");
            return;
        }
        
        let tags = await getTags();
        // 增加我们的自定义标签
        tags.push("LeetCode");
        tags.push("LeetCode-难度-" + difficulty);
        // 将tags按照 "#{tag}" 的方式构造，然后空格拼接，从而形成ob可以识别的格式
        const tagString = tags.map((tag) => `#${tag}`).join(" ");
        //TODO: 开发一个添加自定义标签的本地服务，将自定义标签持久化，然后该插件可以通过访问该服务指定问题编号从而获取自定义标签。

        // 获取当前题目的链接
        const currentUrl = window.location.href;

        const content = `## [${title}](${currentUrl})
${tagString}
## Description
${description}
`;

        const {vaultName, problemFolder, newTitle} = await getObsidianPath(title);
        const filepath = `${problemFolder}/${newTitle}.md`;

        const uri = `obsidian://advanced-uri?vault=${encodeURIComponent(vaultName)}&filepath=${encodeURIComponent(filepath)}&data=${encodeURIComponent(content)}&mode=overwrite`;
        window.location.href = uri;
    }
</script>

<Button variant="orange" onclick={saveToObsidian}>
    {globalState.site === "cn" ? "同步问题到Ob" : "Sync Problem to Ob"}
</Button>