import { Sprite } from './src/Sprite.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const context = canvas.getContext('2d')

const options = {
  position: {x: 50, y: 50},
  velocity: {x: 0, y: 0},
  acceleration: {x: 0, y: 0},
  width: 100,
  height: 100,
  friction: 0,
  rotation: { angle: 0, speed: 0},
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
 
  //player2.update()
  
  /* player.setVelocityX(0)
  player.setVelocityY(0) */
  player.setRotationSpeed(0)

  if(keys.left.pressed) {
    player.setRotationSpeed(-5)
    /* player.setVelocityX(-10)
    if (!player.getFlipX()) player.setFlipX(true) */
  }

  if(keys.right.pressed) {
    player.setRotationSpeed(5)
    /* player.setVelocityX(10)
    if (player.getFlipX()) player.setFlipX(false) */
  }

  if(keys.up.pressed) {
    //player.acccelerate(0.1,0.1)
    /*player.setVelocityY(1)
    player.setVelocityX(1) */
    //player.moveX()
    //player.accelerate(1,1)
    player.setVelocity(10,10)
  } else if (!keys.up.pressed) {
    //player.moveX()
    //player.accelerate(0,0)
    //player.acccelerate(0,0)
    player.setVelocity(0,0)
  }
  // if(keys.down.pressed) 

  /* if(player.detectCollision(player2)) {
    console.log('hej')
  } */

}

animate()
