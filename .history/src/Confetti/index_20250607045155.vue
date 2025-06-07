<script lang="ts" setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const fire = () => {
  const count = 200
  const defaults = {
    origin: { y: 0.7 }
  }

  function fire(particleRatio: number, opts: object) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    })
  }

  fire(0.25, { spread: 26, startVelocity: 55 })
  fire(0.2, { spread: 60 })
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  fire(0.1, { spread: 120, startVelocity: 45 })
}

onMounted(() => {
  utools.setExpendHeight(300);
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