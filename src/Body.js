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
  #angle = 0
  #rotationSpeed = 0
  #friction = 1
  #canRotate

  /**
   * @param {number} positionX - X coordinate of body object.
   * @param {number} positionY - Y coordinate of body object.
   * @param {string} perspective - Perpective of body. 'top-down' | 'side-on'
   */
  constructor (positionX, positionY, perspective) {
    this.positionX = positionX
    this.positionY = positionY

    // Rotation flag for body type
    if (perspective === 'top-down') {
      this.#canRotate = true
    } else if (perspective === 'side-on') {
      this.#canRotate = false
    } else {
      throw new Error('Perspective type not valid.')
    }
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
   * Gets current angle in degrees.
   *
   * @returns {number} - Angle in degrees.
   */
  get angle () {
    return this.#angle
  }

  /**
   * Sets angle.
   *
   * @param {number} value - angle in degrees.
   */
  set angle (value) {
    this.#angle = value
  }

  /**
   * Gets rotation speed.
   *
   * @returns {number} - degrees/frame.
   */
  get rotationSpeed () {
    return this.#friction
  }

  /**
   * Sets rotationspeed.
   *
   * @param {number} value - Rotation speed value. Positive -> clockwise rotation.
   */
  set rotationSpeed (value) {
    if (typeof value !== 'number') {
      throw new Error('Rotationspeed can only be number.')
    }
    this.#rotationSpeed = value
  }

  /**
   * Gets friction multiplier.
   *
   * @returns {number} - Friction.
   */
  get friction () {
    return this.#friction
  }

  /**
   * Sets friction.
   *
   * @param {number} value - Friction multiplier which velocity decreases with.
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
    this.#updateRotation()
    this.#updatePosition()
  }

  /**
   * Updates velocity.
   */
  #updateVelocity () {
    this.velocityX += this.accelerationX
    this.velocityY += this.accelerationY

    let speed = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY)
    const angle = Math.atan2(this.velocityY, this.velocityX)
    if (speed > 0.05) {
      speed -= 0.05
    } else {
      speed = 0
    }
    this.velocityX = Math.cos(angle) * speed
    this.velocityY = Math.sin(angle) * speed
  }

  /**
   * Updates rotation angle with given speed.
   */
  #updateRotation () {
    if (this.#canRotate) {
      this.angle += this.#rotationSpeed
      if ((this.angle && this.angle >= 360) || this.angle <= -360) this.angle = 0
    }
  }

  /**
   * Updates position.
   */
  #updatePosition () {
    if (!this.#canRotate) {
      this.positionX += this.velocityX
      this.positionY += this.velocityY
    } else {
      this.positionX += this.velocityX * Math.cos((this.angle * Math.PI) / 180)
      this.positionY += this.velocityY * Math.sin((this.angle * Math.PI) / 180)
    }
  }
}
