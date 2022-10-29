/* eslint-disable accessor-pairs */
import { Body } from './Body.js'

/**
 * Class for rectangular bodies.
 */
export class Rectangle extends Body {
  #vertices
  #edges
  #bounds
  /**
   *
   * @param {number} width - Width of rectangle object.
   * @param {number} height - Height of rectangle object.
   * @param {number} positionX - X coordinate of rectangle object.
   * @param {number} positionY - Y coordinate of rectangle object.
   * @param {string} perspective - Perspective of rectangle. 'top-down' | 'side-on'
   */
  constructor (width, height, positionX, positionY, perspective) {
    super(positionX, positionY, perspective)
    this.width = width
    this.height = height
    this.#vertices = {}
    this.#edges = {}
    this.#bounds = {
      x: { min: 0, max: innerWidth },
      y: { min: 0, max: innerHeight }
    }
  }

  /**
   * Sets movement boundaries.
   *
   * @param {object} bounds - Object of bounding values. { x: { max: Number, min: number }, y: { max: Number, min: Number} },  }
   */
  set bounds (bounds) {
    this.#bounds = bounds
  }

  /**
   *
   */
  update () {
    super.update()
    this.vertices = {
      v1: this.#getVertex(this.positionX + this.width, this.positionY),
      v2: this.#getVertex(this.positionX + this.width, this.positionY + this.height),
      v3: this.#getVertex(this.positionX, this.positionY + this.height),
      v4: this.#getVertex(this.positionX, this.positionY)
    }

    this.edges = this.#getEdges()
  }

  /**
   * Gets distance between center point of rectangle and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {object} target - Target object.
   * @returns {number} Distance in points.
   */
  distanceTo (target) {
    const centerX = this.positionX + this.width / 2
    const centerY = this.positionY + this.height / 2
    const targetCenterX = target.positionX + (target.width / 2 || 0)
    const targetCenterY = target.positionY + (target.height / 2 || 0)

    return Math.sqrt(Math.pow(centerX - targetCenterX, 2) + Math.pow(centerY - targetCenterY, 2))
  }

  /**
   * Gets angle between center point of rectangle and target.
   * Defaults to center point if target is two dimensional.
   *
   * @param {object} target - Target object.
   * @returns {number} - Angle in degrees.
   */
  angleTo (target) {
    const centerX = this.positionX + this.width / 2
    const centerY = this.positionY + this.height / 2
    const targetCenterX = target.positionX + (target.width / 2 || 0)
    const targetCenterY = target.positionY + (target.height / 2 || 0)

    return (Math.atan2(targetCenterY - centerY, targetCenterX - centerX) * 180) / Math.PI
  }

  /**
   * Detects collision.
   *
   * @param {object} target - { x: Number, y: Number, vertices: [Object], edges: [Object] }
   * @returns {boolean} - True if objects overlap, false if not.
   */
  detectCollision (target) {
    // Check unrotated collision.
    if (
      this.positionX + this.width >= target.positionX &&
      this.positionX <= target.positionX + target.width &&
      this.positionY + this.height >= target.positionY &&
      this.positionY <= target.positionY + target.height
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
   * Gets vertex coordinates of rectangle in any rotation.
   *
   * @param {number} unrotatedX - X coordinate of vertex when unrotated.
   * @param {number} unrotatedY - Y coordinate of vertex when unrotated.
   * @returns {object} - x and y coordinates of vertex.
   */
  #getVertex (unrotatedX, unrotatedY) {
    const currentAngleInRadians = (this.angle * Math.PI) / 180
    const distanceToVertex = this.distanceTo({ positionX: unrotatedX, positionY: unrotatedY })
    const angleToVertex =
      (this.angleTo({ positionX: unrotatedX, positionY: unrotatedY }) * Math.PI) / 180

    return {
      x:
        this.positionX +
        this.width / 2 +
        distanceToVertex * Math.cos(currentAngleInRadians + angleToVertex),
      y:
        this.positionY +
        this.height / 2 +
        distanceToVertex * Math.sin(currentAngleInRadians + angleToVertex)
    }
  }

  /**
   * Gets current edges of rectangle.
   *
   * @returns {object} - Containing vectors "drawn" between each vertex.
   */
  #getEdges () {
    return {
      e1: {
        x: this.vertices.v2.x - this.vertices.v1.x,
        y: this.vertices.v2.y - this.vertices.v1.y
      },
      e2: {
        x: this.vertices.v3.x - this.vertices.v2.x,
        y: this.vertices.v3.y - this.vertices.v2.y
      },
      e3: {
        x: this.vertices.v4.x - this.vertices.v3.x,
        y: this.vertices.v4.y - this.vertices.v3.y
      },
      e4: { x: this.vertices.v1.x - this.vertices.v4.x, y: this.vertices.v1.y - this.vertices.v4.y }
    }
  }

  /**
   * Checks movement boundaries.
   */
  #checkBounds () {
    let minimumSpriteX = null
    let maximumSpriteX = null
    let minimumSpriteY = null
    let maximumSpriteY = null

    // Get maximum and minimum coordinates for sprite.
    for (const vertex in this.vertices) {
      if (minimumSpriteX === null || this.vertices[vertex].x < minimumSpriteX) {
        minimumSpriteX = this.vertices[vertex].x
      }
      if (maximumSpriteX === null || this.vertices[vertex].x > maximumSpriteX) {
        maximumSpriteX = this.vertices[vertex].x
      }
      if (minimumSpriteY === null || this.vertices[vertex].y < minimumSpriteY) {
        minimumSpriteY = this.vertices[vertex].y
      }
      if (maximumSpriteY === null || this.vertices[vertex].y > maximumSpriteY) {
        maximumSpriteY = this.vertices[vertex].y
      }
    }

    // Compare to bounding box
    if (minimumSpriteX < this.#bounds.x.min) {
      this.positionX += 1
      this.velocityX = 0
    } else if (maximumSpriteX > this.#bounds.x.max) {
      this.positionX -= 1
      this.velocityX = 0
    } else if (minimumSpriteY < this.#bounds.y.min) {
      this.positionY += 1
      this.velocityY = 0
    } else if (maximumSpriteY > this.#bounds.y.max) {
      this.positionY -= 1
      this.velocityY = 0
    }
  }
}
