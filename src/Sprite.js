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
    
    
    this.image = new Image()
    this.image.src = './png/Dead (1).png'

    this.image.addEventListener('load', () => {
      this.draw()
    })

  }

  /**
   * Draws frame to canvas.
   */
  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}
