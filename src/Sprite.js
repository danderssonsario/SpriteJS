/* eslint-disable accessor-pairs */
/* eslint-disable jsdoc/check-param-names */
import { Animation } from './Animation.js'
// import { Drawable } from './Drawable.js'
import { Body } from './Body.js'

/**
 * @classdesc - Class for animated sprites.
 */
export class Sprite {
  // Private fields.
  #width
  #height
  #image

  #flipX = false
  #flipY = false
  #startTime = Date.now()

  #bounds
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
    // super(name, context, options)

    this.name = name
    this.context = context
    this.width = options.width
    this.height = options.height
    this.#image = options.image

    this.vertices = {}
    this.edges = {}

    // Defaults to window dimensions.
    this.#bounds = {
      x: { min: 0, max: innerWidth },
      y: { min: 0, max: innerHeight }
    }

    // Animation
    this.#animations = {}
    this.#currentAnimation = null

    // Current (Animation = one or more frames)
    this.#currentFrame = null
    this.#currentFrameIndex = 0

    this.body = new Body(options.positionX, options.positionY, options.perspective)
  }

  /**
   * Gets sprite width.
   *
   * @returns {number} value - width value.
   */
  get width () {
    return this.#width
  }

  /**
   * Sets sprite width.
   *
   * @param {number} value - width value.
   */
  set width (value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': width can only be a number.`)
    }
    this.#width = value
  }

  /**
   * Gets sprite height.
   *
   * @returns {number} value - height value.
   */
  get height () {
    return this.#height
  }

  /**
   * Sets sprite height.
   *
   * @param {number} value - height value.
   */
  set height (value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': height can only be a number.`)
    }
    this.#height = value
  }

  /**
   * Gets x position.
   *
   * @returns {number} - Horizontal coordinate.
   */
  get positionX () {
    return this.body.positionX
  }

  /**
   * Gets y position.
   *
   * @returns {number} - Vertical coordinate.
   */
  get positionY () {
    return this.body.positionY
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
      console.log(this.#currentAnimation)
    } else {
      throw new Error(`Sprite '${this.name}': animation '${name}' is not defined.`)
    }
  }

  /**
   * Updates sprite properties before drawing to canvas.
   */
  update () {
    this.body.update()
    this.#checkBounds()
    this.vertices = {
      v1: this.#getVertex(this.positionX + this.width, this.positionY),
      v2: this.#getVertex(this.positionX + this.width, this.positionY + this.height),
      v3: this.#getVertex(this.positionX, this.positionY + this.height),
      v4: this.#getVertex(this.positionX, this.positionY)
    }

    this.edges = this.#getEdges()

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
    if (this.#currentFrame) {
      this.context.drawImage(
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
    } else {
      throw new Error()
    }
  }

  /**
   * Flips context if toggled.
   */
  #flipContext () {
    if (this.flipX || this.flipY) {
      this.context.translate(this.positionX + this.width / 2, this.positionY + this.height / 2)
      this.context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1)
      this.context.translate(
        -(this.positionX + this.width / 2),
        -(this.positionY + this.height / 2)
      )
    }
  }

  /**
   * Rotates context.
   */
  #rotateContext () {
    this.context.translate(this.positionX + this.width / 2, this.positionY + this.height / 2)
    this.context.rotate((this.angle * Math.PI) / 180)
    this.context.translate(-(this.positionX + this.width / 2), -(this.positionY + this.height / 2))
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
   * Gets distance between center point of sprite and target.
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
   * Gets angle between center point of sprite and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {object | Sprite} target - Target object.
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
   * Detects collision.
   *
   * @param {Sprite} target - { x: Number, y: Number, vertices: [Object], edges: [Object]}
   * @returns {boolean} - True if collision is detected, false if not.
   */
  detectCollision (target) {
    // Check unrotated collision.
    if (
      this.positionX + this.width >= target.positionX &&
      this.positionX <= target.positionX + target.width &&
      this.positionY + this.height >= target.positionY &&
      this.positionY <= target.positionY + target.height
    ) {
      return true
    }

    const normalVectors = []
    // get normal of each edge
    for (const edge in this.edges) {
      const normal = { x: -1 * this.edges[edge].y, y: this.edges[edge].x }
      normalVectors.push(normal)
    }

    for (let i = 0; i < normalVectors.length; i++) {
      // Dot product for all vertices against every normal vector.
      let dotProductMax = null
      let dotProductMin = null
      let targetDotProductMax = null
      let targetDotProductMin = null

      for (const vertex in this.vertices) {
        const dotProduct =
          this.vertices[vertex].x * normalVectors[i].x +
          this.vertices[vertex].y * normalVectors[i].y
        if (dotProductMax === null || dotProduct > dotProductMax) {
          dotProductMax = dotProduct
        }

        if (dotProductMin === null || dotProduct < dotProductMin) {
          dotProductMin = dotProduct
        }
      }

      for (const vertex in target.vertices) {
        const dotProduct =
          target.vertices[vertex].x * normalVectors[i].x +
          target.vertices[vertex].y * normalVectors[i].y
        if (targetDotProductMax === null || dotProduct > targetDotProductMax) {
          targetDotProductMax = dotProduct
        }

        if (targetDotProductMin === null || dotProduct < targetDotProductMin) {
          targetDotProductMin = dotProduct
        }
      }

      // Check if dot product projection overlaps. Check next if true.
      if (
        (dotProductMin > targetDotProductMin && dotProductMin < targetDotProductMax) ||
        (dotProductMax > targetDotProductMin && dotProductMax < targetDotProductMax)
      ) {
        continue
      } else {
        // Return false if gap occurs.
        return false
      }
    }

    return true
  }

  /**
   * Sets movement boundaries.
   *
   * @param {object} bounds - Object of bounding values. { x: { max: Number, min: number }, y: { max: Number, min: Number} },  }
   */
  /*   set bounds (bounds) {
    this.#bounds = bounds
  } */

  /**
   * Gets vertex coordinates of sprite in any rotation.
   *
   * @param {number} unrotatedX - X coordinate of vertex when unrotated.
   * @param {number} unrotatedY - Y coordinate of vertex when unrotated.
   * @returns {object} - x and y coordinates of vertex.
   */
  #getVertex (unrotatedX, unrotatedY) {
    const currentAngleInRadians = (this.angle * Math.PI) / 180
    const distanceToVertex = this.distanceTo({ positionX: unrotatedX, positionY: unrotatedY })
    const angleToVertex =
      (this.angleTo({ positionX: unrotatedX, positionY: unrotatedY }) * Math.PI) / 180

    return {
      x:
        this.positionX +
        this.width / 2 +
        distanceToVertex * Math.cos(currentAngleInRadians + angleToVertex),
      y:
        this.positionY +
        this.height / 2 +
        distanceToVertex * Math.sin(currentAngleInRadians + angleToVertex)
    }
  }

  /**
   * Gets current edges of sprite.
   *
   * @returns {object} - Containing vectors "drawn" between each vertex.
   */
  #getEdges () {
    return {
      e1: {
        x: this.vertices.v2.x - this.vertices.v1.x,
        y: this.vertices.v2.y - this.vertices.v1.y
      },
      e2: {
        x: this.vertices.v3.x - this.vertices.v2.x,
        y: this.vertices.v3.y - this.vertices.v2.y
      },
      e3: {
        x: this.vertices.v4.x - this.vertices.v3.x,
        y: this.vertices.v4.y - this.vertices.v3.y
      },
      e4: { x: this.vertices.v1.x - this.vertices.v4.x, y: this.vertices.v1.y - this.vertices.v4.y }
    }
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
   * Sets new frame index from current animation loop.
   */
  #updateFrame () {
    if (this.#currentAnimation) {
      this.#currentFrame = this.#currentAnimation.frames[this.#currentFrameIndex]
      if (this.#hasReachedDelay()) {
        if (this.#currentFrameIndex >= this.#currentAnimation.frames.length - 1) {
          this.#currentFrameIndex = 0
        } else {
          this.#currentFrameIndex++
        }
      }
    }
  }

  /**
   * Checks if render delay is reached.
   *
   * @returns {boolean} - True if delay is reached.
   */
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
