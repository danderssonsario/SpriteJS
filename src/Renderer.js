export class Renderer {
  constructor(context, positionX, positionY, width, height) {
    this.context = context
    this.positionX = positionX
    this.positionY = positionY
    this.width = width
    this.height = height
  }

  rotate(angle) {
    this.context.translate(this.positionX + this.width / 2, this.positionY + this.height / 2)
    this.context.rotate((angle * Math.PI) / 180)

    this.context.translate(
      -(this.positionX + this.width / 2),
      -(this.positionY + this.height / 2))
  }

  /**
   * Flips context if toggled.
   */
  flip(x, y) {
    if (x || y) {
      this.context.translate(this.positionX + this.width / 2, this.positionY + this.height / 2)
      this.context.scale(x ? -1 : 1, y ? -1 : 1)
      this.context.translate(
        -(this.positionX + this.width / 2),
        -(this.positionY + this.height / 2)
      )
    }
  }

  draw(frame) {
    this.context.save()
    if (frame.image) {
      this.context.drawImage(
        frame.image,
        frame.offsetX,
        frame.offsetY,
        frame.width,
        frame.height,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      )
    } else {
      this.context.fillRect(this.positionX, this.positionY, this.width, this.height)
    }
    this.context.restore()
  }
}
