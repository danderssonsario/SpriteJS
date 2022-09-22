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
    this.position = {
      x: options.position.x,
      y: options.position.y
    }

    this.width = options.width
    this.height = options.height

    this.velocity = {
      x: options.velocity.x,
      y: options.velocity.y
    }

    this.acceleration = {
      x: options.acceleration.x,
      y: options.acceleration.y
    }

    this.flip = {
      x: false,
      y: false
    }

    this.vertices = {}
    this.edges = {}

    this.friction = options.friction

    this.rotation = {
      angle: options.rotation.angle,
      speed: options.rotation.speed
    }

    /* this.image = {
      type: options.image.type,
      src: options.image.src
    } */
    // Animation
    this.animations = {}
    this.currentAnimation = null

    // Current (Animation = one or more frames)
    this.currentFrame = {}
    this.currentFrameIndex = 0

    // Render delay control.
    this.delayPerFrame
    this.currentTime = 0
    this.startTime = Date.now()
    this.fpsInterval = 1000
  }

  /**
   * Updates sprite properties before drawing to canvas.
   */
  update() {
    this.vertices = {
      v1: this.#getVertex(this.position.x + this.width, this.position.y),
      v2: this.#getVertex(this.position.x + this.width, this.position.y + this.height),
      v3: this.#getVertex(this.position.x, this.position.y + this.height),
      v4: this.#getVertex(this.position.x, this.position.y)
    }

    this.edges = this.#getEdges()

    /* if(!this.canWalkOffCanvas) {
        if (this.position.x <= this.canvas.offsetLeft) {
          this.position.x = this.canvas.offsetLeft
        } else {
          this.position.x += this.velocityX
        }
        if (this.position.x >= this.canvas.offsetLeft + this.canvas.width) {

        }
         else if (this.position.y <= this.canvas.offsetTop || this.position.y >= this.canvas.offsetTop + this.canvas.height) {
          
        }
      } */

    this.#updateVelocity()

    this.#applyFriction()
    this.#updateRotation()
    this.#updatePosition()
    this.#updateFrame()

    this.#draw()
  }

  /**
   * Draws current frame to canvas.
   */
  #draw() {
    this.context.save()

    // Flips context if toggled.
    if (this.flipX || this.flipY) {
      this.context.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
      this.context.scale(this.flipX ? -1 : 1, this.flipY ? -1 : 1)
      this.context.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2))
    }

    this.context.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
    this.context.rotate((this.rotation.angle * Math.PI) / 180)

    this.context.translate(-(this.position.x + this.width / 2), -(this.position.y + this.height / 2))
    //this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
    this.context.drawImage(this.currentFrame, this.position.x, this.position.y, this.width, this.height)

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
   * Sets sprite velocty.
   *
   * @param {Number} velocityX - Horizontal velocity.
   * @param {Number} velocityY - Vertical velocity.
   */
  setVelocity(velocityX, velocityY) {
    this.velocity.x = velocityX
    this.velocity.y = velocityY
  }

  /**
   * Sets sprite acceleration.
   *
   * @param {Number} accelerationX - Horizontal acceleration.
   * @param {Number} accelerationY - Vertical acceleration.
   */
  setAcceleration(accelerationX, accelerationY) {
    this.acceleration.x = accelerationX * Math.cos((this.rotation.angle * Math.PI) / 180)
    this.acceleration.y = accelerationY * Math.sin((this.rotation.angle * Math.PI) / 180)
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
    this.rotation.speed = value
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
    const centerX = this.position.x + this.width / 2
    const centerY = this.position.y + this.height / 2
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
    const centerX = this.position.x + this.width / 2
    const centerY = this.position.y + this.height / 2
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
    if (
      this.position.x + this.width >= target.x &&
      this.position.x <= target.x + target.width &&
      this.position.y + this.height >= target.y &&
      this.position.y <= target.y + target.height
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
   */
  setBoundaries() {}

  /**
   *
   */
  #getVertex(x, y) {
    const currentAngleInRadians = (this.rotation.angle * Math.PI) / 180

    const distanceToVertex = this.distanceTo({ x: x, y: y })
    const angleToVertex = (this.angleTo({ x: x, y: y }) * Math.PI) / 180

    return {
      x:
        this.position.x +
        this.width / 2 +
        distanceToVertex * Math.cos(currentAngleInRadians + angleToVertex),
      y:
        this.position.y +
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

  #updateVelocity() {
    this.velocity.x += this.acceleration.x
    this.velocity.y += this.acceleration.y
  }

  #applyFriction() {
    let speed = Math.hypot(this.velocity.x, this.velocity.y)

    if (speed > this.friction) {
      speed -= this.friction
    } else {
      speed = 0
    }

    this.velocity.x = Math.cos((this.rotation.angle * Math.PI) / 180) * speed
    this.velocity.y = Math.sin((this.rotation.angle * Math.PI) / 180) * speed
  }

  #updateRotation() {
    this.rotation.angle += this.rotation.speed
    if (this.rotation.angle >= 360 || this.rotation.angle <= -360) this.rotation.angle = 0
  }

  #updatePosition() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  #updateFrame() {
    this.currentFrame = this.currentAnimation.images[this.currentFrameIndex]
    this.currentTime = Date.now()
    let elapsedTime = this.currentTime - this.startTime
    if (elapsedTime > this.fpsInterval) {
      if (
        this.currentFrameIndex >=
        (this.currentAnimation.images.length - 1 || this.currentAnimation.images.frameCount)
      ) {
        this.currentFrameIndex = 0
      }

      this.currentFrameIndex++
      this.startTime = this.currentTime
    }
  }
}
