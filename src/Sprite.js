export class Sprite {
  /**
   *
   * @param {String} name - Identifier for errors.
   * @param {CanvasRenderingContext2D} context - 2D rendering context for canvas element.
   * @param {*} options - Configuration options parameters.
   * @param {Number} x - X coordinate of sprite object.
   * @param {Number} y - Y coordinate of sprite object.
   * @param {Number} width - Width of sprite object.
   * @param {Number} height - Height of sprite object.
   */
  constructor(name, context, options) {
    this.name = name
    this.context = context

    // Physical properties
    this.x = options.x
    this.y = options.y

    this.width = 100
    this.height = 100
    this.velocityX = 0
    this.velocityY = 0
    this.accelerationX = 0
    this.accelerationY = 0
    this.flipX = false
    this.flipY = false
    this.vertices = {}
    this.edges = {}

    this.rotationSpeed = 0
    this.angle = 0

    // Animation
    this.animations = {}
    this.currentAnimation = null

    // Current (Animation = one or more frames)
    this.currentFrame = {}
    this.currentFrameIndex = 0

    // Render delay control.
    //this.delay = 1000
    this.currentTime = 0
    this.startTime = Date.now()
    this.fpsInterval = 1000
  }

  /**
   * Updates sprite properties before drawing to canvas.
   */
  update() {
    this.velocityX += this.accelerationX
    this.velocityY += this.accelerationY

    this.vertices = {
      v1: this.#getVertex(this.x + this.width, this.y),
      v2: this.#getVertex(this.x + this.width, this.y + this.height),
      v3: this.#getVertex(this.x, this.y + this.height),
      v4: this.#getVertex(this.x, this.y)
    }

    this.edges = this.#getEdges()

    /* if(!this.canWalkOffCanvas) {
        if (this.x <= this.canvas.offsetLeft) {
          this.x = this.canvas.offsetLeft
        } else {
          this.x += this.velocityX
        }
        if (this.x >= this.canvas.offsetLeft + this.canvas.width) {

        }
         else if (this.y <= this.canvas.offsetTop || this.y >= this.canvas.offsetTop + this.canvas.height) {
          
        }
      } */

    this.y += this.velocityY
    this.angle += this.rotationSpeed

    if (this.angle >= 360 || this.angle <= -360) this.angle = 0

    this.currentTime = Date.now()
    let elapsedTime = this.currentTime - this.startTime
    if (elapsedTime > this.fpsInterval) {
      if (this.currentAnimation) {
        if (
          this.currentFrameIndex >=
          (this.currentAnimation.images.length || this.currentAnimation.images.frameCount)
        ) {
          this.currentFrameIndex = 0
        }

        this.currentFrame = this.currentAnimation.images[this.currentFrameIndex]
      }

      this.currentFrameIndex++
      this.startTime = this.currentTime
    }

    this.#draw()
  }

  /**
   * Draws current frame to canvas.
   */
  #draw() {
    this.context.save()

    // Flips context if toggled.
    if (this.flipX || this.flipY) {
      this.context.translate(this.x + this.width / 2, this.y + this.height / 2)
      this.context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1)
      this.context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))
    }

    this.context.translate(this.x + this.width / 2, this.y + this.height / 2)
    this.context.rotate((this.angle * Math.PI) / 180)
    this.context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2))
    //this.context.fillRect(this.x, this.y, this.width, this.height)

    this.context.drawImage(this.currentFrame, this.x, this.y, this.width, this.height)

    this.context.restore()
  }

  /**
   * Adds animation loop to sprite instance.
   *
   * @param {Object} options - { name: String, image: { src: [String] } }.
   */
  addAnimation(options) {
    const { name, images } = options

    if (this.animations[name]) {
      throw new Error(`Sprite '${this.name}': animation '${name}' already exists.`)
    }

    let frames = []

    for (let i = 0; i < images.src.length; i++) {
      const image = new Image()
      image.src = images.src[i]

      frames.push(image)
    }

    this.animations[name] = {
      name: name,
      images: frames
    }
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
   * Sets horizontal velocity.
   *
   * @param {Number} value - Velocity value.
   */
  setVelocityX(value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': velocity can only be number.`)
    }
    this.velocityX = value
  }

  /**
   * Sets vertical velocity.
   *
   * @param {Number} value - Velocity value.
   */
  setVelocityY(value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': velocity can only be number.`)
    }
    this.velocityY = value
  }

  /**
   * Sets horizontal acceleration.
   *
   * @param {Number} value - Acceleration value.
   */
  setAccelerationX(value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': acceleration can only be number.`)
    }
    this.accelerationX = value
  }

  /**
   * Sets vertical acceleration.
   *
   * @param {Number} value - Acceleration value.
   */
  setAccelerationY() {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': acceleration can only be number.`)
    }
    this.accelerationY = value
  }

  /**
   * Gets flipX property.
   *
   * @returns {Boolean} - True if sprite is flipped on its horizontal axis.
   */
  getFlipX() {
    return this.flipX === true
  }

  /**
   * Gets flipY property.
   *
   * @returns {Boolean} - True if sprite is flipped on its vertical axis.
   */
  getFlipY() {
    return this.flipY === true
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
    this.flipX = value
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
    this.flipX = value
  }

  setRotationSpeed(value) {
    if (typeof value !== 'number') {
      throw new Error(`Sprite '${this.name}': acceleration can only be number.`)
    }
    this.rotationSpeed = value
  }

  getAngle() {
    return this.angle
  }

  /**
   * Gets distance between center point of sprite and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {Object} target - Target object.
   * @returns {Number} Distance in points.
   */
  distanceTo(target) {
    const centerX = this.x + this.width / 2
    const centerY = this.y + this.height / 2
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
    const centerX = this.x + this.width / 2
    const centerY = this.y + this.height / 2
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
    // Unrotated rectangles.
    /* if (
      this.x + this.width >= target.x &&
      this.x <= target.x + target.width &&
      this.y + this.height >= target.y &&
      this.y <= target.y + target.height
    ) {
      return true
    } */

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

      // Return true if every dot product projection overlaps.
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
   */
  setBoundaries() {}

  /**
   *
   */
  #getVertex(x, y) {
    const currentAngleInRadians = (this.angle * Math.PI) / 180

    const distanceToVertex = this.distanceTo({ x: x, y: y })
    const angleToVertex = (this.angleTo({ x: x, y: y }) * Math.PI) / 180

    return {
      x:
        this.x +
        this.width / 2 +
        distanceToVertex * Math.cos(currentAngleInRadians + angleToVertex),
      y:
        this.y +
        this.height / 2 +
        distanceToVertex * Math.sin(currentAngleInRadians + angleToVertex)
    }
  }

  #getEdges() {
    return {
      e1: {
        x: this.vertices.v2.x - this.vertices.v1.x,
        y: this.vertices.v2.y - this.vertices.v2.y
      },
      e2: {
        x: this.vertices.v3.x - this.vertices.v2.x,
        y: this.vertices.v3.y - this.vertices.v2.y
      },
      e3: {
        x: this.vertices.v4.x - this.vertices.v3.x,
        y: this.vertices.v4.y - this.vertices.v3.y
      },
      e4: { x: this.vertices.v1.x - this.vertices.v4.x, y: this.vertices.v4.y - this.vertices.v1.y }
    }
  }
}
