<template>
  <div class="car-icon">
    <svg
      width="50"
      height="30"
      viewBox="0 0 200 100"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 车身 -->
      <rect
        x="20"
        y="40"
        width="160"
        height="40"
        rx="10"
        ry="10"
        fill="white"
      />

      <!-- 车顶 -->
      <polygon points="50,40 80,20 120,20 150,40" fill="white" />

      <!-- 车轮 -->
      <circle cx="50" cy="80" r="10" fill="black" />
      <circle cx="150" cy="80" r="10" fill="black" />
    </svg>
  </div>
</template>

<style scoped>
.car-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
