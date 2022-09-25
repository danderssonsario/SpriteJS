import { Frame } from './Frame.js'

export class Animation extends Frame {
  constructor(image, frameWidth, frameHeight, frameCount, rowIndex) {
    super(frameWidth, frameHeight)
    this.image = image
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.frameCount = frameCount
    this.rowIndex = rowIndex 
    this.frames = []
  }

  generateFrames() {
    for (let i = 0; i < this.frameCount; i++) {
      this.frames.push({ width: this.frameWidth, height: this.frameHeight, offsetX: this.frameWidth * i, offsetY: this.frameHeight * this.rowIndex})
    }
  }

}