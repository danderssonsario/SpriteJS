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
  #friction = 1

  /**
   * @param {number} positionX - X coordinate of body object.
   * @param {number} positionY - Y coordinate of body object.
   */
  constructor (positionX, positionY) {
    this.#positionX = positionX
    this.#positionY = positionY
  }

  /**
   * Gets body velocity.
   *
   * @returns {number} - Horizontal velocity.
   */
  get velocityX () {
    return this.#velocityX
  }

  /**
   * Sets body velocty.
   *
   * @param {number} value - Horizontal velocity.
   */
  set velocityX (value) {
    if (typeof value !== 'number') {
      throw new Error('Velocity can only be a number.')
    }
    this.#velocityX = value
  }

  /**
   * Gets body velocity.
   *
   * @returns {number} - Vertical velocity.
   */
  get velocityY () {
    return this.#velocityY
  }

  /**
   * Sets body velocty.
   *
   * @param {number} value - Vertical velocity.
   */
  set velocityY (value) {
    if (typeof value !== 'number') {
      throw new Error('Velocity can only be a number.')
    }
    this.#velocityY = value
  }

  /**
   * Gets body acceleration.
   *
   * @returns {number} - Horizontal acceleration.
   */
  get accelerationX () {
    return this.#accelerationX
  }

  /**
   * Sets body acceleration.
   *
   * @param {number} value - Horizontal acceleration.
   */
  set accelerationX (value) {
    if (typeof value !== 'number') {
      throw new Error('Acceleration can only be a number.')
    }
    this.#accelerationX = value
  }

  /**
   * Gets body acceleration.
   *
   * @returns {number} - Vertical acceleration.
   */
  get accelerationY () {
    return this.#accelerationY
  }

  /**
   * Sets body acceleration.
   *
   * @param {number} value - Vertical acceleration.
   */
  set accelerationY (value) {
    if (typeof value !== 'number') {
      throw new Error('Acceleration can only be a number.')
    }
    this.#accelerationY = value
  }

  /**
   * Gets x position.
   *
   * @returns {number} - Horizontal coordinate.
   */
  get positionX () {
    return this.#positionX
  }

  /**
   * Sets x position.
   *
   * @param {number} value - Horizontal coordinate.
   */
  set positionX (value) {
    if (typeof value !== 'number') {
      throw new Error('Position can only be a number.')
    }
    this.#positionX = value
  }

  /**
   * Gets y position.
   *
   * @returns {number} - Vertical coordinate.
   */
  get positionY () {
    return this.#positionY
  }

  /**
   * Sets y position.
   *
   * @param {number} value - Vertical coordinate.
   */
  set positionY (value) {
    if (typeof value !== 'number') {
      throw new Error('Position can only be a number.')
    }
    this.#positionY = value
  }

  /**
   * Gets friction subtrahend.
   *
   * @returns {number} - Friction.
   */
  get friction () {
    return this.#friction
  }

  /**
   * Sets friction.
   *
   * @param {number} value - Friction number which velocity gets subtracted with.
   */
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

  /**
   * Updates velocity.
   */
  #updateVelocity () {
    this.#velocityX += this.#accelerationX
    this.#velocityY += this.#accelerationY
    this.#velocityX *= this.#friction
    this.#velocityY *= this.#friction
  }

  /**
   * Updates position.
   */
  #updatePosition () {
    this.#positionX += this.#velocityX
    this.#positionY += this.#velocityY
  }
}
