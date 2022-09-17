export class Sprite {
  /**
   *
   * @param {String} name - Identifier for errors.
   * @param {HTMLCanvasElement} canvas - Canvas element to create drawing context from.
   * @param {*} options - Configuration options parameters.
   * @param {Number} x - X coordinate of sprite object.
   * @param {Number} y - Y coordinate of sprite object.
   * @param {Number} width - Width of sprite object.
   * @param {Number} height - Height of sprite object.
   */
  constructor(name, canvas, options) {
    this.name = name
    this.canvas = canvas
    this.context = canvas.getContext('2d')

    // Physical properties
    this.x = 0
    this.y = 100
    this.width = 200
    this.height = 200
    this.velocityX = 0
    this.velocityY = 0
    this.accelerationX = 0
    this.accelerationY = 0
    this.flipX = false
    this.flipY = false

    this.rotationSpeed = 0
    this.angle = 0

    //
    this.isEdited

    // Animation
    this.animations = {}
    this.currentAnimation = {}

    // Current (Animation = one or more frames)
    this.currentFrame = {}
    this.currentFrameIndex = 0

    // Render delay control.
    this.fps = 60
    this.currentTime = 0
    this.startTime = Date.now()
    this.fpsInterval = 1000 / this.fps

    this.canWalkOffCanvas = false

    
  }

  /**
   * Updates sprite properties before drawing to canvas.
   */
  update() {
    this.currentTime = Date.now()
    let elapsedTime = this.currentTime - this.startTime
    if (elapsedTime > this.fpsInterval) {

      this.velocityX += this.accelerationX
      this.velocityY += this.accelerationY

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

      if (
        this.currentFrameIndex >=
        (this.currentAnimation.images.length || this.currentAnimation.images.frameCount)
      ) {
        this.currentFrameIndex = 0
      }

      this.currentFrame = this.currentAnimation.images[this.currentFrameIndex]
      this.currentFrameIndex++

      this.#draw()
      this.startTime = this.currentTime
    }
  }

  /**
   * Draws current frame to canvas.
   */
  #draw() {
    this.context.clearRect(0, 0, innerWidth, innerHeight)
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

    this.context.fillRect(this.x, this.y, this.width, this.height)
    //this.context.drawImage(this.currentFrame, this.x, this.y, this.width, this.height)
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

  distanceTo() {

  }

  angleTo() {

  }

  detectCollision(target) {

  }

  
}
