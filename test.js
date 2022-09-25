import { Sprite } from './src/Sprite.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const context = canvas.getContext('2d')

const options = {
  positionX: 50,
  positionY: innerHeight/2,
  width: 100,
  height: 100,
  image: '../player.png',
}



const player = new Sprite('player', context, options)
//const player2 = new Sprite('player2', context, options2)

/* player.addAnimation({
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
}) */

player.addAnimation({
  name: 'Walk',
  frameWidth: 46,
  frameHeight: 50,
  frameCount: 8,
  rowIndex: 3,
})

player.setCurrentAnimation('Walk')
player.VelocityX = 1

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

player.VelocityX = 1


/* *
 * Sprite loop.
 */
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
  //player2.update()
  
/*   player.setFriction(0.98)
  player.setAcceleration(0, 0)
  player.setRotationSpeed(0)

  if (keys.left.pressed) {
    player.setRotationSpeed(-5)
  }

  if (keys.right.pressed) {
    player.setRotationSpeed(5)
  }

  if (keys.up.pressed) {
    player.setAcceleration(0.05, 0.05)
  }

  if (keys.down.pressed) {
    player.setAcceleration(-0.05, -0.05)
  } */

}

animate()


