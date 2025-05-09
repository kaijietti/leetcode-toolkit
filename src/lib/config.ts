import { GM } from "$";
import { toast } from "./utils/toast";

export const CONFIG = {
    APP_NAME: "LeetCode Toolkit",
};

type ObsidianConfig = {
    vaultName: string;
    problemFolderTemplate: string;
};

const DEFAULT_CONFIG: ObsidianConfig = {
    vaultName: "Map",
    problemFolderTemplate: "算法题/LeetCode 题解/{{title}}",
};

// 异步获取用户配置
export const getUserConfig = async (): Promise<ObsidianConfig> => {
    const stored = await GM.getValue("obsidianConfig", "");
    try {
        return stored ? JSON.parse(stored) : DEFAULT_CONFIG;
    } catch {
        return DEFAULT_CONFIG;
    }
};

// 弹出 prompt 让用户设置配置
export const setupUserConfig = async () => {
    const current = await getUserConfig();
    const input = prompt(
        "请输入你的配置（JSON 格式）",
        JSON.stringify(current, null, 2)
    );
    if (input) {
        try {
            const parsed = JSON.parse(input);
            // 检查 vaultName 和 problemFolderTemplate 是否存在
            if (!parsed.vaultName || !parsed.problemFolderTemplate) {
                toast.error("配置格式错误！");
                return;
            }
            // 检查 vaultName 是否为字符串
            if (typeof parsed.vaultName !== "string") {
                toast.error("vaultName 必须是字符串！");
                return;
            }
            // 检查 problemFolderTemplate 是否为字符串
            if (typeof parsed.problemFolderTemplate !== "string") {
                toast.error("problemFolderTemplate 必须是字符串！");
                return;
            }
            // 检查 problemFolderTemplate 中包含 {{title}}
            if (!parsed.problemFolderTemplate.includes("{{title}}")) {
                toast.error(
                    "problemFolderTemplate 必须包含 {{title}} 占位符！"
                );
                return;
            }
            await GM.setValue("obsidianConfig", JSON.stringify(parsed));
            toast.success("配置已保存！");
        } catch (e) {
            toast.error("配置格式错误！");
        }
    }
};

// 注册菜单项，油猴图标右键可以打开
GM.registerMenuCommand("配置 Obsidian 设置", setupUserConfig);
