<template>
  <div class="timeline-wrapper">
    <a-timeline :reverse="true">
      <a-timeline-item
        v-for="record in rechargeRecordStore.rechargeRecords"
        :key="record.id"
        >Current pokemon coin is {{ record.currentPokemonCoin }}, after
        recharged is {{ record.currentPokemonCoin + record.amountRecharge }}.
        {{ record.rechargeAt.replace("T", " ") }}</a-timeline-item
      >
    </a-timeline>
  </div>
</template>

<script setup lang="ts">
import { userRechargeRecordStore } from "@/store/RechargeRecordStore";
import { onMounted } from "vue";

const rechargeRecordStore = userRechargeRecordStore();

onMounted(() => {
  rechargeRecordStore.getRechargeRecords();
});
</script>

<style scoped>
.timeline-wrapper {
  max-height: 350px;
  overflow-y: auto;
  padding: 12px 16px;
  background-color: #f9f2e0;
  border-radius: 8px;
  border: 1px solid #e0d8c3;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* 美化时间线项 */
::v-deep(.ant-timeline-item) {
  padding: 10px;
  margin-bottom: 10px;
}

::v-deep(.ant-timeline-item-content) {
  font-size: 14px;
  line-height: 1.5;
  color: #444;
  background-color: #fffdf8;
  padding: 6px 10px;
  border-radius: 4px;
  border-left: 3px solid #409eff;
}

/* 优化圆点样式 */
::v-deep(.ant-timeline-item-head) {
  background-color: #409eff;
  border-color: #409eff;
  width: 10px;
  height: 10px;
}
</style>
