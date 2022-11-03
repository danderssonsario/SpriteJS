/* eslint-disable accessor-pairs */
import { Body } from './Body.js'

/**
 * Class for rectangular bodies.
 */
export class Rectangle extends Body {
  #bounds
  #width
  #height
  /**
   *
   * @param {number} width - Width of rectangle object.
   * @param {number} height - Height of rectangle object.
   * @param {number} positionX - X coordinate of rectangle object.
   * @param {number} positionY - Y coordinate of rectangle object.
   */
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
    let minimumSpriteX = null
    let maximumSpriteX = null
    let minimumSpriteY = null
    let maximumSpriteY = null

    // Get maximum and minimum coordinates for sprite.
    for (const vertex in this.vertices) {
      if (minimumSpriteX === null || this.vertices[vertex].x < minimumSpriteX) {
        minimumSpriteX = this.vertices[vertex].x
      }
      if (maximumSpriteX === null || this.vertices[vertex].x > maximumSpriteX) {
        maximumSpriteX = this.vertices[vertex].x
      }
      if (minimumSpriteY === null || this.vertices[vertex].y < minimumSpriteY) {
        minimumSpriteY = this.vertices[vertex].y
      }
      if (maximumSpriteY === null || this.vertices[vertex].y > maximumSpriteY) {
        maximumSpriteY = this.vertices[vertex].y
      }
    }

    // Compare to bounding box
    if (minimumSpriteX < this.#bounds.x.min) {
      this.positionX += 1
      this.velocityX = 0
    } else if (maximumSpriteX > this.#bounds.x.max) {
      this.positionX -= 1
      this.velocityX = 0
    } else if (minimumSpriteY < this.#bounds.y.min) {
      this.positionY += 1
      this.velocityY = 0
    } else if (maximumSpriteY > this.#bounds.y.max) {
      this.positionY -= 1
      this.velocityY = 0
    }
  }

  /**
   * Detects collision.
   *
   * @param {object} target - { x: number, y: number, width: number, height: number }
   * @returns {boolean} - True if collision is detected, false if not.
   */
  detectCollision (target) {
    if (this.#objectsOverlap(target)) {
      return true
    } else {
      return false
    }
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  #objectsOverlap (target) {
    if (
      this.positionX + this.width >= target.positionX &&
      this.positionX <= target.positionX + target.width &&
      this.positionY + this.height >= target.positionY &&
      this.positionY <= target.positionY + target.height
    ) {
      return true
    }
  }
}
