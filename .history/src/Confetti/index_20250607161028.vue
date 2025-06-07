<script lang="ts" setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const fire = () => {
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
  const end = Date.now() + (500);
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

// Firework特效
const startFirework = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const continuousDefaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 0,
    colors: ['#FF0000', '#00FF00', '#0000FF']  // 添加三原色
  };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);

    const particleCount = 50 * (timeLeft / duration);
    // 左右两侧同时喷射
    confetti({ 
      ...continuousDefaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
    });
    confetti({
      ...continuousDefaults, 
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
}
onMounted(() => {
  fire()
  startFrame()
  triggerShoot()
  startFirework()
})
// 按钮点击处理函数
const handleConfetti = () => {
  fire();
  startFrame();
  triggerShoot();
  startFirework();
};
</script>

<template>
  <div class="confetti-container">
    <button @click="handleConfetti">Congrats!</button>
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
  background: linear-gradient(120deg, #ff6b6b 20%, #ff8e53 80%);
  width: 60px;
  height: 60px;
  padding: 0;
  border-radius: 50%;
  font-size: 24px;
  position: relative;
  border: 2px solid rgba(255,255,255,0.8);
  box-shadow: 0 0 20px rgba(255,107,107,0.6);
  transition: all 0.3s ease;
}

/* 添加烟花辐射效果 */
button::after {
  content: '';
  position: absolute;
  top: -15%;
  left: -15%;
  right: -15%;
  bottom: -15%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
  animation: spark 1.5s infinite linear;
}

/* 添加烟花粒子效果 */
button::before {
  content: '🌸';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

/* 添加环绕光点 */
button span {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  animation: orbit 2s linear infinite;
}

@keyframes spark {
  0% { transform: scale(0.8); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 0.4; }
  100% { transform: scale(0.8); opacity: 0.8; }
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(40px) scale(1); }
  to { transform: rotate(360deg) translateX(40px) scale(0.2); }
}

button:hover {
  transform: rotate(360deg) scale(1.1);
  box-shadow: 0 0 40px rgba(255,107,107,0.8);
}

button:active {
  transform: scale(0.9);
  box-shadow: 0 0 50px rgba(255,107,107,1);
}

/* 生成环绕粒子 */
button:hover::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  animation: 
    particle 1s linear infinite,
    rotate 4s linear infinite;
}

@keyframes particle {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>