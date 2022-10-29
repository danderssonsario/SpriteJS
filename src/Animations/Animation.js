import { Frame } from './Frame.js'
import { Sheet } from './Sheet.js'

/**
 * Encapsulates an sprite animation.
 */
export class Animation extends Sheet {
  /**
   *
   * @param {string} image - Image source.
   * @param {number} frameWidth - Width of single frame.
   * @param {number} frameHeight - Height of single frame.
   * @param {number} frameCount - Number of frames.
   * @param {number} rowIndex - Index tracking vertical offset.
   */
  constructor (image, frameWidth, frameHeight, frameCount, rowIndex) {
    super(image)
    this.frameWidth = frameWidth
    this.frameHeight = frameHeight
    this.frameCount = frameCount
    this.rowIndex = rowIndex
    this.frames = []
  }

  /**
   * Creates and stores framedata.
   */
  generateFrames () {
    for (let i = 0; i < this.frameCount; i++) {
      const frame = new Frame(this.frameWidth, this.frameHeight)
      this.frames.push({ image: this.image, frame, offsetX: frame.width * i, offsetY: frame.height * this.rowIndex })
    }
  }
}
