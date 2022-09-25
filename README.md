# SpriteJS
Javascript library for creating game objects.

## Getting started
Using sprite module
````javascript 
import { Sprite } from './src/Sprite.js'
````

### Creating sprite instance
````javascript
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
const player = new Sprite('name', context, options)
````

### Setting a sprite animation
````javascript
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
````

### Running an animation loop with created sprite
````javascript
function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
}

animate()
````

### Example: Steering plane-like object with arrowkeys.
````javascript
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

const plane = new Sprite('plane', context, options)

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

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()
  player.setFriction(0.98)
  player.setAcceleration(0, 0)
  player.setRotationSpeed(0)

  if(keys.left.pressed) {
    player.setRotationSpeed(-5)
  }

  if(keys.right.pressed) {
    player.setRotationSpeed(5)
  }

  if(keys.up.pressed) {
    player.setAcceleration(0.05, 0.05)
  }

  if(keys.down.pressed) {
    player.setAcceleration(-0.05, -0.05)
  }
}

animate()

````

### Example: Pacman-like controllers.
````javascript
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
  rotation: null,
}

const player = new Sprite('player', context, options)

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

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, canvas.width, canvas.height)

  player.update()

  if(keys.left.pressed) {
    player.setVelocityX(-5)
    player.setVelocityY(0)
  }

  if(keys.right.pressed) {
    player.setVelocityX(5)
    player.setVelocityY(0)
  }

  if(keys.up.pressed) {
    player.setVelocityY(-5)
    player.setVelocityX(0)
  }

  if(keys.down.pressed) {
    player.setVelocityY(5)
    player.setVelocityX(0)
  }
}

animate()

````
