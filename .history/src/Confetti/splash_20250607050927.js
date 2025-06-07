import confetti from 'canvas-confetti'

// 全屏特效参数 - 更华丽的效果
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

// 立即执行并自动关闭
fire()
setTimeout(() => {
  window.close()
}, 3000)
