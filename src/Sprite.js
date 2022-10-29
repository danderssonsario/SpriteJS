/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable accessor-pairs */
/* eslint-disable jsdoc/check-param-names */
import { Animation } from './Animations/Animation.js'
import { Rectangle } from './Physics/Rectangle.js'

/**
 * @classdesc - Class for animated sprites.
 */
export class Sprite {
  // Private fields.
  #image

  #flipX = false
  #flipY = false
  #startTime = Date.now()

  #currentFrame
  #currentFrameIndex

  #animations
  #currentAnimation

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
   * @param {string} perspective - Perpective of sprite. 'top-down' | 'side-on'
   */
  constructor (name, context, options) {
    const { width, height, positionX, positionY, image, perspective } = options
    this.name = name
    this.context = context
    this.width = width
    this.height = height
    this.#image = image

    // Animation
    this.#animations = {}
    this.#currentAnimation = null

    // Current (Animation = one or more frames)
    this.#currentFrame = null
    this.#currentFrameIndex = 0

    this.body = new Rectangle(width, height, positionX, positionY, perspective)
  }

  /**
   * Gets flipX property.
   *
   * @returns {boolean} - True if sprite is flipped on its horizontal axis.
   */
  get flipX () {
    return this.#flipX === true
  }

  /**
   * Sets property to flip sprite on horizontal axis.
   *
   * @param {boolean} value - Flip value.
   */
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

  /**
   * Sets property to flip sprite on vertical axis.
   *
   * @param {boolean} value - Flip value.
   */
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

  /**
   * Updates sprite properties before drawing to canvas.
   */
  update () {
    this.body.update()
    this.#updateFrame()
    this.#updateContext()
  }

  /**
   * Updates context.
   */
  #updateContext () {
    this.context.save()
    this.#flipContext()
    this.#rotateContext()
    this.#drawContext()
    this.context.restore()
  }

  /**
   * Draws context.
   */
  #drawContext () {
    this.context.drawImage(
      this.#currentFrame.image,
      this.#currentFrame.offsetX,
      this.#currentFrame.offsetY,
      this.#currentFrame.frame.width,
      this.#currentFrame.frame.height,
      this.body.positionX,
      this.body.positionY,
      this.body.width,
      this.body.height
    )
  }

  /**
   * Flips context if toggled.
   */
  #flipContext () {
    if (this.flipX || this.flipY) {
      this.context.translate(this.body.positionX + this.body.width / 2, this.body.positionY + this.body.height / 2)
      this.context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1)
      this.context.translate(
        -(this.body.positionX + this.body.width / 2),
        -(this.body.positionY + this.body.height / 2)
      )
    }
  }

  /**
   * Rotates context.
   */
  #rotateContext () {
    this.context.translate(this.body.positionX + this.body.width / 2, this.body.positionY + this.body.height / 2)
    this.context.rotate((this.body.angle * Math.PI) / 180)
    this.context.translate(-(this.body.positionX + this.body.width / 2), -(this.body.positionY + this.body.height / 2))
  }

  /**
   * Adds animation loop to sprite instance.
   *
   * @param {object} options - { name: String, frameWidth: Number, frameHeight: Number, frameCount: Number, rowIndex: Number } }.
   */
  addAnimation (options) {
    const { name, frameWidth, frameHeight, frameCount, rowIndex, delayPerFrame } = options
    this.delayPerFrame = delayPerFrame

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
   * Sets new frame index from current animation loop.
   */
  #updateFrame () {
    this.#currentFrame = this.#currentAnimation.frames[this.#currentFrameIndex]
    if (this.#hasReachedDelay()) {
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
    if (elapsedTime > this.delayPerFrame) {
      this.#startTime = currentTime
      return true
    }
    return false
  }
}
