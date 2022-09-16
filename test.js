import { Sprite } from './src/Sprite.js'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight

const player = new Sprite('player', canvas)
