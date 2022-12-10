/**
 * @classdesc - Class that encapsulates kinematic behaviour.
 */
export class Body {
  #positionX
  #positionY
  #velocityX = 0
  #velocityY = 0
  #accelerationX = 0
  #accelerationY = 0
  #friction = 0

  /**
   * @param {number} positionX - X coordinate of body object.
   * @param {number} positionY - Y coordinate of body object.
   */
  constructor (positionX, positionY) {
    this.#positionX = positionX
    this.#positionY = positionY
  }

  get velocityX () {
    return this.#velocityX
  }

  set velocityX (value) {
    if (typeof value !== 'number') {
      throw new Error('Velocity can only be a number.')
    }
    this.#velocityX = value
  }

  get velocityY () {
    return this.#velocityY
  }

  set velocityY (value) {
    if (typeof value !== 'number') {
      throw new Error('Velocity can only be a number.')
    }
    this.#velocityY = value
  }

  get accelerationX () {
    return this.#accelerationX
  }

  set accelerationX (value) {
    if (typeof value !== 'number') {
      throw new Error('Acceleration can only be a number.')
    }
    this.#accelerationX = value
  }

  get accelerationY () {
    return this.#accelerationY
  }

  set accelerationY (value) {
    if (typeof value !== 'number') {
      throw new Error('Acceleration can only be a number.')
    }
    this.#accelerationY = value
  }

  get positionX () {
    return this.#positionX
  }

  set positionX (value) {
    if (typeof value !== 'number') {
      throw new Error('Position can only be a number.')
    }
    this.#positionX = value
  }

  get positionY () {
    return this.#positionY
  }

  set positionY (value) {
    if (typeof value !== 'number') {
      throw new Error('Position can only be a number.')
    }
    this.#positionY = value
  }

  get friction () {
    return this.#friction
  }

  set friction (value) {
    if (typeof value !== 'number') {
      throw new Error('Friction can only be number.')
    }
    this.#friction = value
  }

  /**
   * Updates properties of body.
   */
  update () {
    this.#updateVelocity()
    this.#updatePosition()
  }

  #updateVelocity () {
    this.#velocityX += this.#accelerationX
    this.#velocityY += this.#accelerationY

    this.#velocityX *= this.#friction
    this.#velocityY *= this.#friction
  }

  #updatePosition () {
    this.#positionX += this.#velocityX
    this.#positionY += this.#velocityY
  }
}
