import { defineStore } from "pinia";

/**
 * 使用hooks的命名
 * 例如 useCountStore useXXXStore  使用与xxx相关的数据
 * defineStore 要接受一个id值，该id值最好与该ts文件的名字一致
 */
export const useCountStore = defineStore("Count", {
  // 真真存东西的地方
  state() {
    return {
      sum: 6,
    };
  },
});
