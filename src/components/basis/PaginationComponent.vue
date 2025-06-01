<template>
  <n-pagination
    v-model:page="currentPage"
    :page-size="pageSize"
    :item-count="props.data.length"
    show-size-picker
    :page-sizes="pageSizeList"
    @update:page-size="handlePageSizeChange"
    class="mt-4"
  />
</template>
<script setup name="BasisTableComponent" lang="ts" generic="T">
import { computed, ref, watch } from 'vue'
import { NPagination } from 'naive-ui'

interface IPagination<T> {
  data: T[]
  pageSizeList: number[]
}

const props = defineProps<IPagination<T>>()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(props.pageSizeList[0] ?? 1)

const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

// 分页后的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return props.data.slice(start, end)
})

// Send currently page data
const emit = defineEmits<{
  (e: 'page-changed', paginatedData: T[], currentPage: number, pageSize: number): void
}>()

watch(
  [() => props.data, currentPage, pageSize],
  () => {
    emit('page-changed', paginatedData.value, currentPage.value, pageSize.value)
  },
  { deep: true, immediate: true },
)
</script>
<style lang="scss">
.mt-4 {
  margin-top: 1rem;
}
</style>
