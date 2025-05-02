import { CURRENT_USER_ID, RECHARGE_RECORDS_API } from "@/api/GameAPI";
import {
  IRechargeRecord,
  IRechargeRecordDTO,
  mapDtoToModel,
} from "@/model/IRechargeRecord";
import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./UserStore";

export const userRechargeRecordStore = defineStore(
  "rechargeRecordStore",
  () => {
    const rechargeRecords = ref<IRechargeRecord[]>([]);
    const rechargeRecordStore_loading = ref(false);

    const userStore = useUserStore();
    userStore.getCurrentUser();

    async function getRechargeRecords() {
      try {
        rechargeRecordStore_loading.value = true;
        const response = await axios.get(
          RECHARGE_RECORDS_API + "?userId=" + CURRENT_USER_ID
        );
        rechargeRecords.value = response.data
          .filter(
            (rechargeRecordDTO: IRechargeRecordDTO) =>
              rechargeRecordDTO.userId === CURRENT_USER_ID
          )
          .map((rechargeRecordDTO: IRechargeRecordDTO) =>
            mapDtoToModel(rechargeRecordDTO)
          );
      } catch (error) {
        console.error("Get recharge record failed: ", error);
      } finally {
        rechargeRecordStore_loading.value = false;
      }
    }

    async function createNewRechargeRecord(amountRecharge: number) {
      try {
        const newRechargeRecordDTO: IRechargeRecordDTO = {
          userId: userStore.user.userId ?? CURRENT_USER_ID,
          amountRecharge: amountRecharge,
          currentPokemonCoin: userStore.user.pokemonCoin,
          rechargeAt: new Date(),
        };
        const res = await axios.post<IRechargeRecordDTO>(
          RECHARGE_RECORDS_API,
          newRechargeRecordDTO
        );
        rechargeRecords.value = [
          ...rechargeRecords.value,
          mapDtoToModel(res.data),
        ];
      } catch (error) {
        console.error("Create new recharge record failed: ", error);
      }
    }

    return {
      rechargeRecords,
      rechargeRecordStore_loading,
      getRechargeRecords,
      createNewRechargeRecord,
    };
  }
);
