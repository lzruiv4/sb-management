import { testUser, UserAPI } from "@/model/GameAPI";
import { IUser } from "@/model/IUser";
import axios from "axios";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useUserStore = defineStore("userStore", () => {
  const user = ref<IUser>({
    id: "",
    firstname: "",
    lastname: "",
    poke_coin: 0,
  });
  const loading = ref(false);

  // check for data has been loading
  watch(user, (newUser) => {
    if (newUser) console.log("User data has been loading.");
  });

  async function getCurrentUser() {
    try {
      loading.value = true;
      const res = await axios.get(UserAPI + "/" + testUser);
      user.value = res.data;
    } catch (error) {
      console.error("Get user failed:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function updateUser(newUser: IUser) {
    try {
      console.log(newUser);
      const res = await axios.put(UserAPI + "/" + testUser, newUser);
      user.value = res.data;
    } catch (error) {
      console.error("User update failed", error);
    }
  }

  return { user, loading, getCurrentUser, updateUser };
});
