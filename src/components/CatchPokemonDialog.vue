<template>
  <el-dialog
    :model-value="callDialogInComponent"
    @close="emitClose"
    @update:modelValue="emitClose"
    title="Tipp"
    class="dialog_css"
  >
    <div>
      <span class="span_css">{{ message }}</span>
    </div>
    <div>
      <el-select
        v-if="userStore.user.poke_coin === 0"
        v-model="selectedValue"
        placeholder="Select"
        class="select_css"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="button_css">
      <el-button
        style="width: 30%; height: 50px; font-size: 25px"
        @click="onCancel"
        >Cancel</el-button
      >
      <el-button
        style="width: 30%; height: 50px; font-size: 25px"
        type="primary"
        @click="onConfirm"
        >Confirm</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from "vue";
import { POKEMON_AMOUNT } from "@/api/PokemonAPI";
import { testUser } from "@/api/GameAPI";
import { useUserStore } from "@/store/UserStore";
import { usePokemonRecordsStore } from "@/store/PokemonRecordsStore";
import { dateFormatter } from "@/utils/DateTools";
import {
  SET_CAPTURE_A_NEW_POKEMON_MESSAGE,
  SET_RECHARGE_POKEMON_COIN_MESSAGE,
} from "@/model/GameMessage";

const userStore = useUserStore();
const pokemonRecordsStore = usePokemonRecordsStore();

const selectedValue = ref("0");

const options = [
  { label: "1 Pokemon coin", value: 1 },
  { label: "5 Pokemon coin", value: 5 },
  { label: "10 Pokemon coin", value: 10 },
];

const message = computed(() => {
  return userStore.user.poke_coin > 0
    ? SET_CAPTURE_A_NEW_POKEMON_MESSAGE
    : SET_RECHARGE_POKEMON_COIN_MESSAGE;
});

defineProps<{
  callDialogInComponent: boolean;
}>();

const emit = defineEmits<{
  (e: "update:callDialogInComponent", value: boolean): void;
}>();

const onConfirm = () => {
  emit("update:callDialogInComponent", false);
  userStore.user.poke_coin > 0 ? catchNewPokemon() : balanceTopUp();
};

const onCancel = () => {
  emit("update:callDialogInComponent", false);
};

const emitClose = () => {
  emit("update:callDialogInComponent", false);
};

function catchNewPokemon() {
  if (userStore.user.poke_coin > 0) {
    pokemonRecordsStore.catchANewPokemon({
      poke_id: (Math.floor(Math.random() * POKEMON_AMOUNT) + 1).toString(),
      catch_time: dateFormatter(new Date().toString()),
      // TODO: After login feature should changed
      user_id: testUser,
    });
    userStore.updateUser({
      id: userStore.user.id,
      firstname: userStore.user.firstname,
      lastname: userStore.user.lastname,
      poke_coin: userStore.user.poke_coin - 1,
    });
  }
}

function balanceTopUp() {
  // TODO
  userStore.updateUser({
    id: userStore.user.id,
    firstname: userStore.user.firstname,
    lastname: userStore.user.lastname,
    poke_coin: userStore.user.poke_coin + parseInt(selectedValue.value),
  });
}
</script>

<style scope>
.span_css {
  display: flex;
  font-size: 30px;
  margin: 20px;
}

.dialog_css {
  gap: 10px;
}

.select_css {
  max-width: 90%;
  margin: 20px;
}

.button_css {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
