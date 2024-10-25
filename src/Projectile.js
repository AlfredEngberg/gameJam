import arrowImage from './assets/sprites/arrow.png'

export default class Projectile {
  constructor(game, x, y, angle) {
    this.game = game
    this.width = 40
    this.height = 5
    this.x = x
    this.y = y
    this.angle = angle

    this.speed = 400
    this.damage = 1
    this.markedForDeletion = false

    // Arrow sprite image
    const image = new Image()
    image.src = arrowImage
    this.image = image

    // Sprite animation variables
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    // Flip sprite
    this.flip = false
  }

  update(deltaTime) {
    const velocity = {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle),
    }

    this.x += velocity.x * (deltaTime / 1000)
    this.y += velocity.y * (deltaTime / 1000)

    if (this.x > this.game.width) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    // Draw arrow image and rotate it based on its angle
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
    )
    context.restore()
  }
}
