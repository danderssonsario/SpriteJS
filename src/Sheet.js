/**
 * Encapsulates a sprite sheet.
 */
export class Sheet {
  #src

  /**
   * @param {string} src - Sheet source.
   */
  constructor (src) {
    this.#src = src
  }

  /**
   * Gets sheet image.
   *
   * @returns {object} - Sheet as an HTMLImageElement.
   */
  get image () {
    const img = new Image()
    img.src = this.#src
    return img
  }
}
