# SpriteJS
Javascript library for creating game objects.

## Description
This module enables the creation and use of game objects in a simple way. It gives the possibility to render animations and add kinematic behaviour in a single class.

## Getting started
[Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) the repository and use it as u like!

### Installing dependencies (vite)
``javascript
  npm install
``
### Run demo app
````javascript
npm run dev
````

### Import sprite module
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
  positionX: 50,
  positionY: innerHeight/2,
  width: 100,
  height: 100,
  image: '../player.png',
  perspective: 'side-on'
}
const player = new Sprite('name', context, options)
````

### Setting a sprite animation
````javascript
player.addAnimation({
  name: 'Walk',
  frameWidth: 46,
  frameHeight: 50,
  frameCount: 8,
  rowIndex: 3,
  delayPerFrame: 1000,
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

### Example: Steering object with arrowkeys.
````javascript
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

   if (keys.up.pressed) {
    player.velocityX = 0
    player.velocityY = -5
  }

  if (keys.left.pressed) {
    player.velocityX = -5
    player.velocityY = 0
  }

  if (keys.right.pressed) {
    player.velocityX = 5
    player.velocityY = 0
  }

  if (keys.down.pressed) {
    player.velocityX = 0
    player.velocityY = 5
  }
}

animate()

````
