<template>
  <a-timeline reverse="true">
    <a-timeline-item
      v-for="record in rechargeRecordStore.rechargeRecords"
      :key="record.id"
      >{{ record.rechargeAt.replace("T", " ") }} : Current pokemon coin is
      {{ record.currentPokemonCoin }}, after recharged is
      {{ record.currentPokemonCoin + record.amountRecharge }}</a-timeline-item
    >
  </a-timeline>
</template>

<script setup lang="ts">
import { userRechargeRecordStore } from "@/store/RechargeRecordStore";
import { onMounted } from "vue";

const rechargeRecordStore = userRechargeRecordStore();

onMounted(() => {
  rechargeRecordStore.getRechargeRecords();
});
</script>
