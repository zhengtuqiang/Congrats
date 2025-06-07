import confetti from 'canvas-confetti'

// 全屏特效参数
const fire = () => {
    const count = 2000  // 增加粒子数量
    const defaults = {
      startVelocity: 60,  // 提高初速度
      spread: 200,        // 扩大基础扩散范围
      ticks: 100,         // 延长粒子存活时间
      zIndex: 9999,
      disableForReducedMotion: false  // 强制显示动画
    }
  
    // 添加多方向发射
    const directions = [
      { angle: 45, origin: { x: 0, y: 0.5 } },
      { angle: 135, origin: { x: 1, y: 0.5 } }
    ]
    
    directions.forEach(({angle, origin}) => {
      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.4),
        angle,
        origin
      })
    })
  }

// 立即执行并自动关闭
fire()
setTimeout(() => {
  window.close()
}, 3000)
