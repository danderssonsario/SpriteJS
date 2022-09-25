export class Animation {
  constructor(image, frameWidth, frameHeight, frameCount, rowIndex) {
    
    this.image = image
    /* this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.frameCount = frameCount
    this.rowIndex = rowIndex */
    this.frameData = []
  }

  generateFrames(frameWidth, frameHeight, frameCount, rowIndex) {
    
    for (let i = 0; i < frameCount; i++) {
      console.log('hej')
      this.frameData.push({ width: frameWidth, height: frameHeight, offsetX: frameWidth * i, offsetY: frameHeight * rowIndex})
    }
  }
}
