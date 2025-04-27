import { defineConfig } from "vitest/config";
import path from "path";
import vue from "@vitejs/plugin-vue"; // 确保已安装

export default defineConfig({
  plugins: [vue()], // Vue 3 单文件组件支持
  test: {
    globals: true,
    environment: "happy-dom",
    // 修正点：使用 testTransformMode 替代 transformMode
    testTransformMode: {
      web: [".vue"], // 处理 .vue 文件
    },
    // 别名配置（需与 vue.config.js 一致）
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // 覆盖率配置（可选）
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
