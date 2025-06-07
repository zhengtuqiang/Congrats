import confetti from 'canvas-confetti'

// 全屏特效参数
const fire = () => {
  const count = 1000
  const defaults = { 
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999
  }

  confetti({
    ...defaults,
    particleCount: count,
    origin: { x: 0.5, y: 0.4 }
  })
}

// 立即执行并自动关闭
fire()
setTimeout(() => {
  window.close()
}, 3000)
