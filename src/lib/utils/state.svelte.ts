export type LeetCodeSite = "global" | "cn";

export const state: {
    site: LeetCodeSite;
} = $state({
    site: "global",
});
