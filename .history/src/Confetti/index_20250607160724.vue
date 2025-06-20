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
    <button @click="handleConfetti">撒花 🌸</button>
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
  background: linear-gradient(145deg, #ff6b6b, #ff8e53); /* 改为橙红色渐变 */
  padding: 18px 35px;
  border-radius: 50px;      /* 加大圆角 */
  font-size: 20px;          /* 放大字体 */
  font-weight: bold;        /* 加粗字体 */
  letter-spacing: 1px;      /* 添加字间距 */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2); /* 文字阴影 */
  border: 3px solid #fff;   /* 加粗边框 */
  box-shadow: 0 6px 20px rgba(255,107,107,0.4); /* 加强阴影 */
  position: relative;       /* 为动画效果准备 */
  overflow: hidden;         /* 隐藏溢出效果 */
}

button::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%);
  animation: shine 3s infinite;
}

button:hover {
  transform: translateY(-3px) scale(1.08); /* 添加Y轴位移 */
  box-shadow: 0 8px 25px rgba(255,107,107,0.6);
}

@keyframes shine {
  0% { transform: rotate(0deg) translateX(-100%); }
  100% { transform: rotate(360deg) translateX(100%); }
}


</style>