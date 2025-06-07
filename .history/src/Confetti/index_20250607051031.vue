<script lang="ts" setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const fire = () => {
  // 透明背景设置
  document.body.style.background = 'transparent';
  
  const count = 1000
  const defaults = { 
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
    disableForReducedMotion: true // 无障碍考虑
  }

  // 主烟花效果
  confetti({
    ...defaults,
    particleCount: count,
    origin: { x: 0.5, y: 0.4 }
  })
  
  // 额外添加侧边效果
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: count/2,
      origin: { x: 0.2, y: 0.5 },
      colors: ['#FF0000', '#FFFF00', '#FF69B4']
    })
  }, 500)
}

onMounted(() => {
  fire()
})
</script>

<template>
  <div class="confetti-container">
    <button @click="fire">撒花 🌸</button>
  </div>

</template>

<style>
.confetti-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
}

button {
  background: #ff69b4;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  z-index: 9;
}


</style>