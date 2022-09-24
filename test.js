import { Sprite } from './src/Sprite.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const context = canvas.getContext('2d')

const options = {
  position: {x: 50, y: innerHeight/2},
  velocity: {x: 0, y: 0},
  acceleration: {x: 0, y: 0},
  width: 100,
  height: 100,
  friction: 1,
  rotation: { angle: null, speed: 0},
}
const player = new Sprite('player', context, options)
//const player2 = new Sprite('player2', context, {x: 50, y: 200})

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
player.setBoundingBox({ x: { min: 0, max: innerWidth }, y: { min: 0, max: innerHeight}}) 

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
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  if (keys.left.pressed) {
    player.setVelocityX(-5)
    player.setVelocityY(0)
  }

  if (keys.right.pressed) {
    player.setVelocityX(5)
    player.setVelocityY(0)
  }

  if (keys.up.pressed) {
    player.setVelocityY(-5)
    player.setVelocityX(0)
  }

  if (keys.down.pressed) {
    player.setVelocityY(5)
    player.setVelocityX(0)
  }

}

animate()


