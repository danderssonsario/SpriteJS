import { Body } from './Body.js'

/**
 * Class for rectangular bodies.
 */
export class Rectangle extends Body {
  #bounds

  constructor (width, height, positionX, positionY) {
    super(positionX, positionY)
    this.width = width
    this.height = height
    this.#bounds = {
      x: { min: 0, max: innerWidth },
      y: { min: 0, max: innerHeight }
    }
  }

  /**
   * Sets movement boundaries.
   *
   * @param {object} bounds - Object of bounding values. { x: { max: Number, min: number }, y: { max: Number, min: Number} },  }
   */
  set bounds (bounds) {
    this.#bounds = bounds
  }

  /**
   * Gets distance between center point of rectangle and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {object} target - Target object.
   * @returns {number} Distance in points.
   */
  distanceTo (target) {
    const centerX = this.positionX + this.width / 2
    const centerY = this.positionY + this.height / 2
    const targetCenterX = target.positionX + (target.width / 2 || 0)
    const targetCenterY = target.positionY + (target.height / 2 || 0)

    return Math.sqrt(Math.pow(centerX - targetCenterX, 2) + Math.pow(centerY - targetCenterY, 2))
  }

  /**
   * Gets angle between center point of rectangle and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {object} target - Target object.
   * @returns {number} - Angle in degrees.
   */
  angleTo (target) {
    const centerX = this.positionX + this.width / 2
    const centerY = this.positionY + this.height / 2
    const targetCenterX = target.positionX + (target.width / 2 || 0)
    const targetCenterY = target.positionY + (target.height / 2 || 0)

    return (Math.atan2(targetCenterY - centerY, targetCenterX - centerX) * 180) / Math.PI
  }

  /**
   * Updates Rectangle body.
   */
  update () {
    super.update()
    this.#checkBounds()
  }

  /**
   * Checks movement boundaries.
   */
  #checkBounds () {
    if (this.positionX < this.#bounds.x.min) {
      this.positionX = this.#bounds.x.min
      this.velocityX = 0
    }
    if (this.positionX > (this.#bounds.x.max - this.width)) {
      this.positionX = (this.#bounds.x.max - this.width)
      this.velocityX = 0
    }
    if (this.positionY < this.#bounds.y.min) {
      this.positionY = this.#bounds.y.min
      this.velocityY = 0
    }
    if (this.positionY > (this.#bounds.y.max - this.height)) {
      this.positionY = (this.#bounds.y.max - this.height)
      this.velocityY = 0
    }
  }

  /**
   * Detects collision between two rectangles.
   *
   * @param {object} target - { x: number, y: number, width: number, height: number }
   * @returns {boolean} - True if collision is detected, false if not.
   */
  detectCollision (target) {
    return this.positionX + this.width >= target.positionX &&
      this.positionX <= target.positionX + target.width &&
      this.positionY + this.height >= target.positionY &&
      this.positionY <= target.positionY + target.height
  }
}
