import { Sprite } from './src/Sprite.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const player = new Sprite('player', canvas)

player.addAnimation({
  name: 'Walk',
  images: {
    src: [
      './png/Run (1).png',
      './png/Run (2).png',
      './png/Run (3).png',
      './png/Run (4).png',
      './png/Run (5).png',
      './png/Run (6).png',
      './png/Run (7).png',
      './png/Run (8).png'
    ]
  }
})

player.setCurrentAnimation('Walk')

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    player.move('RIGHT')
  }
  if (event.key === 'ArrowLeft') {
    player.move('LEFT')
  }
})

function animate() {
  requestAnimationFrame(animate)
  player.update()
}
animate()
