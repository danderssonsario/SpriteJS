import { Animation } from './Animation.js'
import { Renderer } from './Renderer.js'

export class Sprite {
  #name
  #context
  #positionX
  #positionY
  #width
  #height
  #velocityX = 0
  #velocityY = 0
  #accelerationX = 0
  #accelerationY = 0
  #angle = null
  #rotationSpeed
  #friction = 1
  #flipX = false
  #flipY = false
  #startTime = Date.now()
  #image
  #bounds
  /**
   *
   * @param {String} name - Identifier for errors.
   * @param {CanvasRenderingContext2D} context - 2D rendering context for canvas element.
   * @param {*} options - Configuration options parameters.
   * @param {Number} x - X coordinate of sprite object.
   * @param {Number} y - Y coordinate of sprite object.
   * @param {Number} width - Width of sprite object.
   * @param {Number} height - Height of sprite object.
   * @param {Number}
   */
  constructor(name, context, options) {
    this.renderer = new Renderer(
      context,
      options.positionX,
      options.positionY,
      options.width,
      options.height
    )
    this.#name = name
    this.#context = context
    this.#positionX = options.positionX
    this.#positionY = options.positionY
    this.#width = options.width
    this.#height = options.height

    let image = new Image()
    image.src = options.image
    this.#image = image

    this.vertices = {}
    this.edges = {}

    // Defaults to window dimensions.
    this.#bounds = {
      x: { min: 0, max: innerWidth },
      y: { min: 0, max: innerHeight }
    }

    // Animation
    this.animations = {}
    this.currentAnimation = {}

    // Current (Animation = one or more frames)
    this.currentFrame = null
    this.currentFrameIndex = 0

    // Render delay control.
    this.delayPerFrame = 1000
  }

  /**
   * Sets sprite velocty.
   *
   * @param {Number} velocityX - Horizontal velocity.
   */
  get velocityX() {
    return this.#velocityX
  }

  /**
   * Sets sprite velocty.
   *
   * @param {Number} velocityX - Horizontal velocity.
   */
  set velocityX(velocityX) {
    if (typeof velocityX !== 'number') {
      throw new Error(`Sprite '${this.name}': velocity can only be a number.`)
    }
    this.#velocityX = velocityX
  }

  /**
   * Sets sprite velocty.
   *
   * @param {Number} velocityY - Vertical velocity.
   */
  get velocityY() {
    return this.#velocityX
  }

  /**
   * Sets sprite velocty.
   *
   * @param {Number} velocityY - Vertical velocity.
   */
  set velocityY(velocityY) {
    if (typeof velocityX !== 'number') {
      throw new Error(`Sprite '${this.name}': velocity can only be a number.`)
    }
    this.#velocityY = velocityY
  }

  /**
   * Gets sprite acceleration.
   */
  get accelerationX() {
    return this.#accelerationX
  }

  /**
   * Sets sprite acceleration.
   *
   * @param {Number} accelerationX - Horizontal acceleration.
   */
  set accelerationX(accelerationX) {
    if (typeof accelerationX !== 'number') {
      throw new Error(`Sprite '${this.name}': acceleration can only be a number.`)
    }

    /*this.#accelerationX = accelerationX * Math.cos((this.#angle * Math.PI) / 180)
    this.#accelerationY = accelerationY * Math.sin((this.#angle * Math.PI) / 180) */
    this.#accelerationX = accelerationX
  }
  /**
   * Sets sprite acceleration.
   *
   * @param {Number} accelerationY - Vertical acceleration.
   */
  set accelerationY(accelerationY) {
    if (typeof accelerationX !== 'number') {
      throw new Error(`Sprite '${this.name}': acceleration can only be a number.`)
    }
    /* this.#accelerationX = accelerationX * Math.cos((this.#angle * Math.PI) / 180)
    this.#accelerationY = accelerationY * Math.sin((this.#angle * Math.PI) / 180) */
    this.#accelerationY = accelerationY
  }

  /**
   * Updates sprite properties before drawing to canvas.
   */
  update() {
    this.vertices = {
      v1: this.#getVertex(this.#positionX + this.#width, this.#positionY),
      v2: this.#getVertex(this.#positionX + this.#width, this.#positionY + this.#height),
      v3: this.#getVertex(this.#positionX, this.#positionY + this.#height),
      v4: this.#getVertex(this.#positionX, this.#positionY)
    }

    this.edges = this.#getEdges()

    this.#updateVelocity()
    this.#applyFriction()
    this.#updateRotation()
    this.#updatePosition()
    this.#updateFrame()

    // Draw frame
    this.renderer.flip(this.#flipX, this.#flipY)
    this.renderer.rotate(this.#angle)
    this.renderer.draw(this.currentFrame)
  }

  /**
   * Adds animation loop to sprite instance.
   *
   * @param {Object} options - { name: String, image: { type: 'array', src: [String] } }.
   */
  addAnimation(options) {
    const { name, frameWidth, frameHeight, frameCount, rowIndex } = options

    if (this.animations[name]) {
      throw new Error(`Sprite '${this.name}': animation '${name}' already exists.`)
    }

    this.animations[name] = new Animation(
      this.#image,
      frameWidth,
      frameHeight,
      frameCount,
      rowIndex
    )
    this.animations[name].generateFrames()
  }

  /**
   * Sets current animation loop.
   *
   * @param {String} name - Name property of animation object.
   */
  setCurrentAnimation(name) {
    if (this.animations[name]) {
      this.currentAnimation = this.animations[name]
    } else {
      throw new Error(`Sprite '${this.name}': animation '${name}' is not defined.`)
    }
  }

  /**
   * Sets rotationspeed.
   *
   * @param {Number} value - Rotation speed value. Positive -> clockwise rotation.
   */
  setRotationSpeed(value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': acceleration can only be number.`)
    }
    this.#rotationSpeed = value
  }

  /**
   * Sets friction.
   *
   * @param {Number} value - Friction value which velocity decreases with.
   */
  setFriction(value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': friction can only be number.`)
    }
    this.#friction = value
  }

  /**
   * Gets flipX property.
   *
   * @returns {Boolean} - True if sprite is flipped on its horizontal axis.
   */
  getFlipX() {
    return this.#flipX === true
  }

  /**
   * Gets flipY property.
   *
   * @returns {Boolean} - True if sprite is flipped on its vertical axis.
   */
  getFlipY() {
    return this.#flipY === true
  }

  /**
   * Sets property to flip sprite on horizontal axis.
   *
   * @param {Boolean} value - Flip value.
   */
  setFlipX(value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Sprite '${this.name}': flip can only be boolean.`)
    }
    this.#flipX = value
  }

  /**
   * Sets property to flip sprite on vertical axis.
   *
   * @param {Boolean} value - Flip value.
   */
  setFlipY(value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Sprite '${this.name}': flip can only be boolean.`)
    }
    this.#flipX = value
  }

  /**
   * Sets property to flip sprite.
   *
   * @param {Boolean} flipX - Horizontal flip.
   * @param {Boolean} flipY - Vertical flip.
   */
  setFlip(flipX, flipY) {
    this.flip.x = flipX
    this.flip.y = flipY
  }

  /**
   * Gets distance between center point of sprite and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {Object} target - Target object.
   * @returns {Number} Distance in points.
   */
  distanceTo(target) {
    const centerX = this.#positionX + this.#width / 2
    const centerY = this.#positionY + this.#height / 2
    const targetCenterX = target.x + (target.width / 2 || 0)
    const targetCenterY = target.y + (target.height / 2 || 0)

    return Math.sqrt(Math.pow(centerX - targetCenterX, 2) + Math.pow(centerY - targetCenterY, 2))
  }

  /**
   * Gets angle between center point of sprite and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {Object|Sprite} target - Target object.
   * @returns {Number} - Angle in degrees.
   */
  angleTo(target) {
    const centerX = this.#positionX + this.#width / 2
    const centerY = this.#positionY + this.#height / 2
    const targetCenterX = target.x + (target.width / 2 || 0)
    const targetCenterY = target.y + (target.height / 2 || 0)

    return (Math.atan2(targetCenterY - centerY, targetCenterX - centerX) * 180) / Math.PI
  }

  /**
   * Detects collision.
   *
   * @param {Sprite} target - { x: Number, y: Number, vertices: [Object], edges: [Object]}
   */
  detectCollision(target) {
    // Check unrotated collision.
    if (
      this.#positionX + this.#width >= target.#positionX &&
      this.#positionX <= target.#positionX + target.width &&
      this.#positionY + this.#height >= target.#positionY &&
      this.#positionY <= target.#positionY + target.height
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
   * @param {Object} bounds - Object of bounding values. { minimumX: Number, maximumX: Number, minimumY: Number, maximumY: Number }
   */
  setBoundingBox(bounds) {
    this.bounds = bounds
  }

  /**
   * Gets vertex coordinates of sprite in any rotation.
   *
   * @param {Number} unrotatedX - X coordinate of vertex when unrotated.
   * @param {Number} unrotatedY - Y coordinate of vertex when unrotated.
   * @returns {Object} - x and y coordinates of vertex.
   */
  #getVertex(unrotatedX, unrotatedY) {
    const currentAngleInRadians = (this.#angle * Math.PI) / 180

    const distanceToVertex = this.distanceTo({ x: unrotatedX, y: unrotatedY })
    const angleToVertex = (this.angleTo({ x: unrotatedX, y: unrotatedY }) * Math.PI) / 180

    return {
      x:
        this.#positionX +
        this.#width / 2 +
        distanceToVertex * Math.cos(currentAngleInRadians + angleToVertex),
      y:
        this.#positionY +
        this.#height / 2 +
        distanceToVertex * Math.sin(currentAngleInRadians + angleToVertex)
    }
  }

  /**
   * Gets current edges of sprite.
   *
   * @returns {Object} - Containing vectors "drawn" between each vertex.
   */
  #getEdges() {
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
   * Updates sprite velocity.
   */
  #updateVelocity() {
    this.#velocityX += this.#accelerationX
    this.#velocityY += this.#accelerationY
  }

  /**
   * Decreases sprite velocity over time.
   */
  #applyFriction() {
    this.#velocityX *= this.#friction
    this.#velocityY *= this.#friction
  }

  /**
   * Updates rotation angle with given speed.
   */
  #updateRotation() {
    if (this.rotation) {
      this.#angle += this.#rotationSpeed
      if ((this.#angle && this.#angle >= 360) || this.#angle <= -360) this.#angle = 0
    }
  }

  /**
   * Updates sprite position.
   */
  #updatePosition() {
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
    if (minimumSpriteX < this.bounds.x.min) {
      this.#positionX += 1
      this.#velocityX = 0
    } else if (maximumSpriteX > this.bounds.x.max) {
      this.#positionX -= 1
      this.#velocityX = 0
    } else if (minimumSpriteY < this.bounds.y.min) {
      this.#positionY += 1
      this.#velocityY = 0
    } else if (maximumSpriteY > this.bounds.y.max) {
      this.#positionY -= 1
      this.#velocityY = 0
    } else {
      if (this.#angle === null) {
        this.#positionX += this.#velocityX
        this.#positionY += this.#velocityY
      } else {
        this.#positionX += this.#velocityX * Math.cos((this.#angle * Math.PI) / 180)
        this.#positionY += this.#velocityY * Math.sin((this.#angle * Math.PI) / 180)
      }
    }
  }

  /**
   * Sets new frame index from current animation loop.
   */
  #updateFrame() {
    if (this.currentAnimation) {
      this.currentFrame = this.currentAnimation.frames[this.currentFrameIndex]
      if (this.#hasReachedDelay()) {
        if (this.currentFrameIndex >= this.currentAnimation.frames.length - 1) {
          this.currentFrameIndex = 0
        } else {
          this.currentFrameIndex++
        }
      }
    }
  }

  /**
   * Checks if render delay is reached
   *
   * @returns {Boolean} - True if delay is reached.
   */
  #hasReachedDelay() {
    let currentTime = Date.now()
    let elapsedTime = currentTime - this.#startTime
    if (elapsedTime > this.delayPerFrame) {
      this.#startTime = currentTime
      return true
    }
    return false
  }
}
