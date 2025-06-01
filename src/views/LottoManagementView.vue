<template>
  <div class="root-layout">
    <div class="inner-layout">
      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="60"
          :width="180"
          show-trigger
          class="sider"
        >
          <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
        </n-layout-sider>

        <div class="content">
          <n-config-provider>
            <router-view />
          </n-config-provider>
        </div>
      </n-layout>
    </div>
  </div>
</template>

<script setup name="LottoManagementView" lang="ts">
import { Person, Speedometer, WalletSharp, BarChart } from '@vicons/ionicons5'
import { NConfigProvider, NLayout, NIcon, NLayoutSider, NMenu, type MenuOption } from 'naive-ui'
import { h, type Component } from 'vue'
import { RouterLink } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 左侧导航选项
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/lotto',
        },
        { default: () => 'Dashboard' },
      ),
    key: 'dashboard',
    icon: renderIcon(Speedometer),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/lotto/users',
        },
        { default: () => 'USERS' },
      ),
    key: 'users',
    icon: renderIcon(Person),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/lotto/rechargeRecords',
        },
        { default: () => 'RECHARGE' },
      ),
    key: 'rechargeRecords',
    icon: renderIcon(WalletSharp),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/lotto/pokemonRecords',
        },
        { default: () => 'POKEMON' },
      ),
    key: 'pokemonRecords',
    icon: renderIcon(BarChart),
  },
]
</script>
<style lang="scss">
.root-layout {
  height: 90vh;
  display: flex;
  flex-direction: column;
}

.header-layout-container {
  height: 100px;
  flex-shrink: 0; /* 不压缩 */
  border-bottom: 1px solid #eaeaea; /* 可选，分割线 */
}

.inner-layout {
  flex: 1; /* 占满剩余高度 */
  display: flex; /* 横向布局 */
  overflow: hidden; /* 防止溢出滚动条 */
}

.sider {
  height: 100%;
  // overflow-y: auto; /* 导航栏内部可以滚动 */
}

.content {
  flex: 1; /* 占据剩余宽度 */
  height: 90%;
  overflow-y: auto; /* 内容区域纵向滚动 */
  padding: 16px;
  background: #fff;
}
</style>
