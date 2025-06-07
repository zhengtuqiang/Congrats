import confetti from 'canvas-confetti'

const fire = () => {
  // 调整为全屏参数
  const count = 400
  const spread = 200

  function fire(particleRatio: number, opts: object) {
    confetti({
      particleCount: Math.floor(count * particleRatio),
      spread,
      ...opts
    })
  }

  fire(0.25, { angle: 55 })
  fire(0.25, { angle: 125 })
  // ...其他发射参数
}

fire()
setTimeout(() => {
  window.close()
}, 3000)
