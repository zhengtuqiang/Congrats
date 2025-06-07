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
    <button @click="handleConfetti"></button>
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
  background: linear-gradient(45deg, #FF6B6B 0%, #FF8E53 50%, #FFD700 100%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 20px rgba(255,107,107,0.6),
    0 0 40px rgba(255,215,0,0.3) inset;
}

/* 核心发光效果 */
button::before {
  content: '🎉';
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0 0 15px rgba(255,107,107,0.8);
  z-index: 2;
}

/* 脉冲光环 */
button::after {
  content: '';
  position: absolute;
  top: -20%;
  left: -20%;
  right: -20%;
  bottom: -20%;
  border-radius: 50%;
  background: radial-gradient(circle, 
    rgba(255,255,255,0.6) 0%,
    rgba(255,255,255,0.4) 30%,
    transparent 70%
  );
  animation: 
    pulse 1.5s infinite ease-out,
    rotate 6s infinite linear;
}

/* 动态粒子 */
button span {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #FFF;
  border-radius: 50%;
  animation: 
    sparkle 1s infinite linear,
    floating 2s infinite ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 0.4; }
  100% { transform: scale(0.8); opacity: 0.8; }
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

@keyframes sparkle {
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(2); }
}

button:hover {
  transform: scale(1.15);
  box-shadow: 
    0 0 40px rgba(255,107,107,0.8),
    0 0 60px rgba(255,215,0,0.5) inset;
}

button:active {
  transform: scale(0.9);
  box-shadow: 
    0 0 80px rgba(255,107,107,1),
    0 0 100px rgba(255,215,0,0.8) inset;
  animation: explode 0.3s ease-out;
}

@keyframes explode {
  0% { transform: scale(1); }
  50% { transform: scale(1.5); opacity: 0.8; }
  100% { transform: scale(0.9); opacity: 1; }
}
</style>