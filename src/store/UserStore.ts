import { testUser } from "@/model/GameAPI";
import { IUser } from "@/model/IUser";
import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: {
      id: "",
      firstname: "",
      lastname: "",
      poke_coin: 0,
    } as IUser | IUser,
    loading: false,
  }),
  actions: {
    async getCurrentUser() {
      try {
        this.loading = true;
        const res = await axios.get(testUser);
        this.user = res.data;
        // console.log("@@", this.user);
      } catch (error) {
        console.error("Get user failed:", error);
        throw error; // 重新抛出错误以便组件可以处理
      } finally {
        this.loading = false; // 无论成功失败都停止加载
      }
    },
  },
});
