<template>
  <el-dialog
    :model-value="callDialogInComponent"
    @close="emitClose"
    @update:modelValue="emitClose"
    title="Tipp"
  >
    <span class="spanDialog"
      >Are you sure you want to get a new Pokémon? It will cost you one pokemon
      coin?</span
    >
    <template #footer>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onConfirm">Confirm</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { PokemonMenge } from "@/model/PokemonAPI";
import { testUser } from "@/model/GameAPI";
import { useUserStore } from "@/store/UserStore";
import { usePokemonRecordsStore } from "@/store/PokemonRecordsStore";
import { dateFormatter } from "@/utils/DateTools";

const userStore = useUserStore();
const pokemonRecordsStore = usePokemonRecordsStore();
const user = computed(() => userStore.user);

defineProps<{
  callDialogInComponent: boolean;
}>();

const emit = defineEmits<{
  (e: "update:callDialogInComponent", value: boolean): void;
}>();

const onConfirm = () => {
  emit("update:callDialogInComponent", false);
  catchNewPokemon();
};

const onCancel = () => {
  emit("update:callDialogInComponent", false);
};

const emitClose = () => {
  emit("update:callDialogInComponent", false);
};

function catchNewPokemon() {
  console.log(dateFormatter(new Date().toString()));
  if (user.value !== null && user.value.poke_coin > 0) {
    pokemonRecordsStore.catchANewPokemon({
      poke_id: (Math.floor(Math.random() * PokemonMenge) + 1).toString(),
      catch_time: dateFormatter(new Date().toString()),
      // TODO: After login feature should changed
      user_id: testUser,
    });
    userStore.updateUser({
      id: user.value.id,
      firstname: user.value.firstname,
      lastname: user.value.lastname,
      poke_coin: user.value.poke_coin - 1,
    });
  }
}
</script>

<style scope>
.spanDialog {
  font-size: 30px;
}
</style>
