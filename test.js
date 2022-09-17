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

let keys = {
  left: { 
    pressed: false
  },
  right: {
    pressed: false
  },
  up: {
    pressed: false
  },
  down: {
    pressed: false
  }
}
addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      keys.left.pressed = true
      break
    case 'ArrowRight':
      keys.right.pressed = true
      break
    case 'ArrowDown':
      keys.down.pressed = true
      break
    case 'ArrowUp':
      keys.up.pressed = true
      break
    default:
      break;
  }
})

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'ArrowLeft':
      keys.left.pressed = false
      break
    case 'ArrowRight':
      keys.right.pressed = false
      break
    case 'ArrowDown':
      keys.down.pressed = false
      break
    case 'ArrowUp':
      keys.up.pressed = false
      break
    default:
      break
  }
})

/**
 * Sprite loop.
 */
function animate() {
  requestAnimationFrame(animate)
  player.update()
  
  player.setVelocityX(0)
  player.setVelocityY(0)

  if(keys.left.pressed) player.setVelocityX(-10)
  if(keys.right.pressed) player.setVelocityX(10)
  if(keys.up.pressed) player.setVelocityY(-10)
  if(keys.down.pressed) player.setVelocityY(10)

  

}
animate()
