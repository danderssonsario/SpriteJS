export class Sprite {
  /**
   *
   * @param {String} name - Identifier.
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
    this.x = 0
    this.y = 0
    this.width = 300
    this.height = 200

    this.animations = {}
    this.currentAnimation = {}

    this.currentFrame = {}
    this.currentFrameIndex = 0
  }

  /**
   * Initiates animation loop.
   */
  update() {
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
      throw new Error(`Sprite ${name}: animation already exists.`)
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
      throw new Error(`Sprite '${name}': animation ${name} is not defined.`)
    }
  }
}
