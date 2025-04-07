import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";

export default defineConfig({
    plugins: [
        svelte(),
        monkey({
            entry: "src/main.ts",
            userscript: {
                icon: "https://vitejs.dev/logo.svg",
                namespace: "npm/vite-plugin-monkey",
                match: ["*://leetcode.com/problems/*"],
                author: "eclipher",
                version: "0.0.1",
            },
        }),
    ],
});
