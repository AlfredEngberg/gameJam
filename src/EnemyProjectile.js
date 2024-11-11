export default class Projectile {
  constructor(game, x, y, angle, speed) {
    this.game = game
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.angle = angle

    this.speed = speed || 200
    this.damage = 1
    this.markedForDeletion = false

    // Sprite image
    this.image = game.assets.maggot_AcidBlob.data

    // Sprite animation variables
    this.maxFrame = 7
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps
    this.frameX = 0
    this.frameY = Math.floor(Math.random() * 4)

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

    if (
      this.x > this.game.width || 
      this.x + this.width < 0 || 
      this.y > this.game.height || 
      this.y + this.height < 0
      ) {
      this.markedForDeletion = true
    }
    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
  }

  draw(context) {
    // Draw arrow image and rotate it based on its angle
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
    )
    if (this.game.debug) {
      context.fillStyle = "black"
      context.strokeRect(0, 0, this.width, this.height)
      context.fillText(`x: ${this.x.toFixed(2)}, y: ${this.y.toFixed(2)}`, 0, 0)
      context.fillText(`frameX: ${this.frameX}`, 0, -20)
    }
    context.restore()
  }
}
