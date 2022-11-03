/* eslint-disable jsdoc/require-jsdoc */
/**
 * Test Module.
 */

import { Sprite } from './src/Sprite.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const context = canvas.getContext('2d')

const options = {
  positionX: 50,
  positionY: innerHeight / 2,
  width: 100,
  height: 100,
  image: '../player.png',
  angle: 0
}

const player = new Sprite('player', context, options)

player.addAnimation({
  name: 'Walk',
  frameWidth: 46,
  frameHeight: 50,
  frameCount: 8,
  rowIndex: 3,
  delayPerFrame: 1000
})

player.setCurrentAnimation('Walk')
const keys = {
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
console.log(Object.values(keys))
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
      break
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

function animate () {
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
  player.draw()
  if (keys.up.pressed && !keys.down.pressed) {
    player.velocityY = -5
  } else if (!keys.up.pressed && keys.down.pressed) {
    player.velocityY = 5
  } else {
    player.velocityY = 0
  }

  if (keys.left.pressed && !keys.right.pressed) {
    player.velocityX = -5
  } else if (!keys.left.pressed && keys.right.pressed) {
    player.velocityX = 5
  } else {
    player.velocityX = 0
  }

/*   if (keys.down.pressed) {
    player.velocityY = 5
  } else {
    player.velocityY = 0
  } */
}

setInterval(() => {
  requestAnimationFrame(animate)
}, 10)

player.bounds = { x: { min: 0, max: innerWidth }, y: { min: 0, max: innerHeight } }
