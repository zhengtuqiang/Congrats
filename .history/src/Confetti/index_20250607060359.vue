<script lang="ts" setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const fire = () => {
utools.showNotification("hello test");
  const count = 300  // 增加粒子总数
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FF69B4', '#FFD700', '#FFA500', '#FF1493', '#00FFFF'] // 添加多彩颜色
  }

  function fire(particleRatio: number, opts: object) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      gravity: 0.8 + Math.random() * 0.3, // 添加随机重力效果
      drift: 0.5 + Math.random() * 0.3    // 添加漂移效果
    })
  }

  // 添加更多层次和形状变化
  fire(0.15, { spread: 60, startVelocity: 65, shapes: ['circle', 'square'] })
  fire(0.2, { spread: 80, decay: 0.92, scalar: 1.3, ticks: 200 })
  fire(0.25, { spread: 120, startVelocity: 45, shapes: ['heart'] })
  fire(0.15, { spread: 150, angle: 120, scalar: 0.8 })  // 左侧发射
  fire(0.15, { spread: 150, angle: 60, scalar: 0.8 })   // 右侧发射
  fire(0.1, { 
    spread: 180, 
    startVelocity: 55, 
    decay: 0.94, 
    scalar: 2,
    shapes: ['star']  // 添加星星形状
  })
}
// 将 frame 动画提取为独立函数
const startFrame = () => {
  const end = Date.now() + (5 * 1000);
  const colors = ['#bb0000', '#ffffff'];

  const frame = () => {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}
// 新增射击特效配置
const shootDefaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
};

// 新增射击函数
const triggerShoot = () => {
  const shoot = () => {
    confetti({ ...shootDefaults, particleCount: 40, scalar: 1.2, shapes: ['star'] });
    confetti({ ...shootDefaults, particleCount: 10, scalar: 0.75, shapes: ['circle'] });
  }

  [0, 100, 200].forEach(timeout => setTimeout(shoot, timeout));
}
onMounted(() => {
  fire()
  startFrame()
  triggerShoot()
})
</script>

<template>
  <div class="confetti-container">
    <button @click="[fire(), startFrame(), triggerShoot()]">撒花 🌸</button>
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
  background: linear-gradient(145deg, #ff69b4, #ff1493); /* 渐变背景 */
  padding: 15px 30px;
  border-radius: 30px;
  font-size: 18px;
  z-index: 9;
  color: white;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 15px rgba(255,105,180,0.3);
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(255,105,180,0.5);
  cursor: pointer;
}


</style>