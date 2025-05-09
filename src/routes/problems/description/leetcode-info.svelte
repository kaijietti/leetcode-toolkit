<script lang="ts" module>
    import { getUserConfig } from "$lib/config";
    import { simulateMouseClickReact } from "$lib/utils/click";
    import { findElement } from "$lib/utils/elementFinder";
    import { htmlToMd } from "$lib/utils/htmlToMd";
    import { problemState } from "../state";

    export const navigateToDescription = async () => {
        const descriptionTabButton = (
            await findElement("#description_tab")
        ).closest(".flexlayout__tab_button")!;

        if (
            !descriptionTabButton?.classList.contains(
                ".flexlayout__tab_button--selected",
            )
        ) {
            // open the description tab if it's not selected
            simulateMouseClickReact(descriptionTabButton);
        }
    };

    export const getTags = async (): Promise<string[]> => {
        await navigateToDescription();

        // 找到包含“相关标签”的文字节点
        const label = await findElement(
            'div.text-body.text-text-primary.dark\\:text-text-primary'
        );

        if (!label) return [];

        // 向上找最近的无属性的 div（可能是容器）
        let parent: HTMLElement | null = label.parentElement;
        while (parent && parent.tagName === "DIV") {
            if (parent.attributes.length === 0) {
                break;
            }
            parent = parent.parentElement;
        }

        // 如果找不到，就用整个文档。
        const container = parent ?? document;

        // 在该容器中查找所有 <a> 标签，过滤 href 以 "/tag" 开头的
        const tagLinks = container.querySelectorAll("a[href^='/tag']");
        const tags: string[] = [];

        tagLinks.forEach((a) => {
            const text = a.textContent?.trim();
            if (text) tags.push(text);
        });

        return tags;
    };

    export const getDifficulty = async (): Promise<string> => {
        await navigateToDescription();

        const difficultySelector = 'div.text-difficulty-easy, div.text-difficulty-medium, div.text-difficulty-hard';

        const el = await findElement(difficultySelector);

        return el?.textContent?.trim() ?? "";
    };

    export const getTitle = async () => {
        await navigateToDescription();

        return (await findElement(".text-title-large")).textContent ?? "";
    };

    export const getDescription = async (convertImage = true) => {
        await navigateToDescription();

        const el = await findElement<HTMLDivElement>(
            "div[data-track-load='description_content']",
        );
        return htmlToMd(el, { convertImage });
    };

    // 写一个工具函数，根据 title 解析信息从而决定在 ob vault 中的路径，文件名等等信息，也就是说返回值要支持能够 {a, b} 这种语法提取
    export const getObsidianPath = async (title: string) => {
        const {vaultName, problemFolderTemplate} = await getUserConfig()
        // TODO: 看是否需要清理 title
        const newTitle = title;
        // template 中的 {{title}} 替换成 newTitle
        const problemFolder = problemFolderTemplate.replace(/{{title}}/g, newTitle);

        return {
            newTitle,
            vaultName,
            problemFolder,
        }
    };

    export const getCode = () => {
        const code = problemState.editor?.getModel()?.getValue() ?? "";
        const language = problemState.editor?.getModel()?.getLanguageId() ?? "";
        return {
            code,
            language,
        };
    }

</script>