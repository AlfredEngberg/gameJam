import arrowImage from './assets/sprites/bullet.png'

export default class Projectile {
  constructor(game, x, y, angle, speed) {
    this.game = game
    this.width = 48
    this.height = 48
    this.x = x
    this.y = y
    this.angle = angle
this.poweredBullet = 0
    this.speed = speed || 400
    if (speed >= 0) {
      this.speed = speed
    }

    this.damage = 1
    this.markedForDeletion = false

    // Arrow sprite image
    const image = new Image()
    image.src = arrowImage
    this.image = image
    this.spriteWidth = 16
    this.spriteHeight = 16

    // Sprite animation variables
    this.frameX = 0
    this.maxFrame = 4
    this.fps = 8
    this.timer = 0
    this.interval = 1000 / this.fps

    // Flip sprite
    this.flip = false
  }

  update(deltaTime) {

    if(this.game.player.powerState===true){
      this.poweredBullet=108
      this.damage=3
    }else{
      this.damage=1
      this.poweredBullet=0
    }

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
      if (this.frameX >= this.maxFrame) {
        this.frameX = 0
      }
    } else {
      this.timer += deltaTime
    }
  }

  draw(context) {
    // Draw arrow image and rotate it based on its angle
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.drawImage(
      this.image,
      176 + this.frameX * this.spriteWidth,
      16 + this.poweredBullet,
      this.spriteWidth,
      this.spriteHeight,
      0,
      0,
      this.width,
      this.height,
    )
    if (this.game.debug) {
      context.strokeStyle = 'red'
      context.strokeRect(0, 0, this.width, this.height)
      this.fillStyle = 'black'
      context.fillText(`FrameX: ${this.frameX}`, 0, -10)
    }
    context.restore()
  }
}
