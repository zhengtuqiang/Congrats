<script lang="ts" setup>
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const closeWindow = () => {
  utools.hideMainWindow()
  const event = new KeyboardEvent('keydown', {
    key: 'w',
    code: 'KeyW',
    metaKey: true,
    bubbles: true,
    cancelable: true
  })
  window.dispatchEvent(event)
  
}

const fire = () => {
  const count = 300
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FF69B4', '#FFD700', '#FFA500', '#FF1493', '#00FFFF']
  }

  function fire(particleRatio: number, opts: object) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      gravity: 0.8 + Math.random() * 0.3,
      drift: 0.5 + Math.random() * 0.3
    })
  }

  fire(0.15, { spread: 60, startVelocity: 65, shapes: ['circle', 'square'] })
  fire(0.2, { spread: 80, decay: 0.92, scalar: 1.3, ticks: 200 })
  fire(0.25, { spread: 120, startVelocity: 45, shapes: ['heart'] })
  fire(0.15, { spread: 150, angle: 120, scalar: 0.8 })
  fire(0.15, { spread: 150, angle: 60, scalar: 0.8 })
  fire(0.1, { 
    spread: 180, 
    startVelocity: 55, 
    decay: 0.94, 
    scalar: 2,
    shapes: ['star']
  })
}

const startFrame = () => {
  return new Promise(resolve => {
    const end = Date.now() + 500
    const colors = ['#bb0000', '#ffffff']
    
    const frame = () => {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors })
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors })
      
      Date.now() < end ? requestAnimationFrame(frame) : resolve()
    }
    requestAnimationFrame(frame)
  })
}

const shootDefaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
}

const triggerShoot = () => {
  return new Promise(resolve => {
    let count = 0
    const shoot = () => {
      confetti({ ...shootDefaults, particleCount: 40, scalar: 1.2, shapes: ['star'] })
      confetti({ ...shootDefaults, particleCount: 10, scalar: 0.75, shapes: ['circle'] })
      ++count === 3 && resolve()
    }
    [0, 100, 200].forEach(t => setTimeout(shoot, t))
  })
}

const startFirework = () => {
  return new Promise(resolve => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const continuousDefaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#FF0000', '#00FF00', '#0000FF']
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        clearInterval(interval)
        resolve()
        return
      }
      
      const particleCount = 50 * (timeLeft / duration)
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min
      
      confetti({ ...continuousDefaults, particleCount, origin: { x: randomInRange(0.1,0.3), y: Math.random()-0.2 } })
      confetti({ ...continuousDefaults, particleCount, origin: { x: randomInRange(0.7,0.9), y: Math.random()-0.2 } })
    }, 250)
  })
}

const handleConfetti = async () => {
  fire()
  await Promise.all([startFrame(), triggerShoot(), startFirework()])
  closeWindow()
}

onMounted(() => {
  fire()
  startFrame()
  triggerShoot()
  startFirework()
})
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
  background: linear-gradient(145deg, #ff69b4, #ff1493);
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