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
    this.context = canvas.getContext('2d')

    // Physical properties
    this.x = 0
    this.y = 0
    this.width = 300
    this.height = 200
    this.velocityX = 0
    this.velocityY = 0
    this.accelerationX = 0
    this.accelerationY = 0

    // Animation
    this.animations = {}
    this.currentAnimation = {}

    // Current (Animation = one or more frames)
    this.currentFrame = {}
    this.currentFrameIndex = 0

    // Render delay control.
    this.fps = 20
    this.currentTime = 0
    this.startTime = Date.now()
    this.fpsInterval = 1000 / this.fps
  }

  /**
   * Initiates animation loop.
   */
  update() {
    this.currentTime = Date.now()
    let elapsedTime = this.currentTime - this.startTime
    if (elapsedTime > this.fpsInterval) {
      this.velocityX += this.accelerationX
      this.velocityY += this.accelerationY
      this.x += this.velocityX
      this.y += this.velocityY

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
    this.context.drawImage(this.currentFrame, this.x, this.y, this.width, this.height)
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
   * @param {String} name - Name attribute of animation object.
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

  
}
