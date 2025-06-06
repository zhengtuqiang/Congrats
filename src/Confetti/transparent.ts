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
// 在文件底部添加初始化代码
const init = () => {
    fire()
    // 延长窗口关闭时间
    setTimeout(() => {
      window.close()
    }, 5000)
  }
  
  // 确保页面加载后执行
  if (document.readyState === 'complete') {
    init()
  } else {
    window.addEventListener('load', init)
  }
