module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.ts$": "ts-jest", // 用 ts-jest 来处理 TypeScript 文件
    "^.+\\.vue$": "vue-jest", // 用 vue-jest 来处理 Vue 文件
  },
  moduleFileExtensions: ["js", "ts", "vue"],
  testEnvironment: "jsdom", // 设置测试环境
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
