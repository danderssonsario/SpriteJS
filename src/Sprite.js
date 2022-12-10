import { Animation } from './Animations/Animation.js'
import { Rectangle } from './Physics/Rectangle.js'

/**
 * @classdesc - Class for animated sprites.
 */
export class Sprite extends Rectangle {
  // Private fields.
  #name
  #context
  #image

  #flipX = false
  #flipY = false
  #startTime = Date.now()

  #angle

  #currentFrame
  #currentFrameIndex

  #animations
  #currentAnimation
  #delayPerFrame
  #pauseAnimation

  /**
   *
   * @param {string} name - Identifier for errors.
   * @param {CanvasRenderingContext2D} context - 2D rendering context for canvas element.
   * @param {object} options - Configuration options parameters.
   * @param {number} positionX - X coordinate of sprite object (options.positionX).
   * @param {number} positionY - Y coordinate of sprite object (options.PositionY).
   * @param {number} width - Width of sprite object (options.width).
   * @param {number} height - Height of sprite object (options.height).
   * @param {number} image - Sprite sheet image path (options.image).
   */
  constructor (name, context, options) {
    const { width, height, positionX, positionY, angle, image } = options
    super(width, height, positionX, positionY)
    this.#name = name
    this.#context = context
    this.#image = image
    this.#angle = angle

    this.#animations = {}
    this.#currentAnimation = null
    this.#currentFrame = null
    this.#currentFrameIndex = 0
    this.#pauseAnimation = true
  }

  get pauseAnimation () {
    return this.#pauseAnimation
  }

  set pauseAnimation (value) {
    this.#pauseAnimation = value
  }

  flip (horizontally, vertically) {
    this.#flipX = horizontally
    this.#flipY = vertically
  }

  /**
   * Gets flipX property.
   *
   * @returns {boolean} - True if sprite is flipped on its horizontal axis.
   */
  get flipX () {
    return this.#flipX === true
  }

  set flipX (value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Sprite '${this.name}': flip can only be boolean.`)
    }
    this.#flipX = value
  }

  /**
   * Gets flipY property.
   *
   * @returns {boolean} - True if sprite is flipped on its vertical axis.
   */
  get flipY () {
    return this.#flipY === true
  }

  set flipY (value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Sprite '${this.name}': flip can only be boolean.`)
    }
    this.#flipY = value
  }

  /**
   * Sets current animation loop.
   *
   * @param {string} name - Name key of animation object.
   */
  setCurrentAnimation (name) {
    if (this.#animations[name]) {
      this.#currentAnimation = this.#animations[name]
    } else {
      throw new Error(`Sprite '${this.name}': animation '${name}' is not defined.`)
    }
  }

  update () {
    super.update()
    this.#updateFrame()
    this.#updateContext()
  }

  #updateContext () {
    this.#context.save()
    this.#flipContext()
    this.#rotateContext()
  }

  #flipContext () {
    if (this.#flipX || this.flipY) {
      this.#context.translate(this.positionX + this.width / 2, this.positionY + this.height / 2)
      this.#context.scale(this.#flipX ? -1 : 1, this.flipY ? -1 : 1)
      this.#context.translate(
        -(this.positionX + this.width / 2),
        -(this.positionY + this.height / 2)
      )
    }
  }

  #rotateContext () {
    this.#context.translate(this.positionX + this.width / 2, this.positionY + this.height / 2)
    this.#context.rotate((this.#angle * Math.PI) / 180)
    this.#context.translate(-(this.positionX + this.width / 2), -(this.positionY + this.height / 2))
  }

  draw () {
    this.#context.drawImage(
      this.#currentFrame.image,
      this.#currentFrame.offsetX,
      this.#currentFrame.offsetY,
      this.#currentFrame.frame.width,
      this.#currentFrame.frame.height,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    )
    this.#context.restore()
  }

  /**
   * Adds animation loop to sprite instance.
   *
   * @param {object} options - { name: String, frameWidth: Number, frameHeight: Number, frameCount: Number, rowIndex: Number } }.
   */
  addAnimation (options) {
    const { name, frameWidth, frameHeight, frameCount, rowIndex, delayPerFrame } = options
    this.#delayPerFrame = delayPerFrame

    if (this.#animations[name]) {
      throw new Error(`Sprite '${this.name}': animation '${name}' already exists.`)
    }

    this.#animations[name] = new Animation(
      this.#image,
      frameWidth,
      frameHeight,
      frameCount,
      rowIndex
    )
    this.#animations[name].generateFrames()
  }

  /**
   * Sets new frame from current animation loop.
   */
  #updateFrame () {
    this.#currentFrame = this.#currentAnimation.frames[this.#currentFrameIndex]
    if (this.#hasReachedDelay() && !this.#pauseAnimation) {
      if (this.#currentFrameIndex >= this.#currentAnimation.frames.length - 1) {
        this.#currentFrameIndex = 0
      } else {
        this.#currentFrameIndex++
      }
    }
  }

  #hasReachedDelay () {
    const currentTime = Date.now()
    const elapsedTime = currentTime - this.#startTime
    if (elapsedTime > this.#delayPerFrame) {
      this.#startTime = currentTime
      return true
    }
    return false
  }
}
