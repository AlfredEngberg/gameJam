import Enemy from './Enemy.js'

export default class Pumpkin extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 2
    this.lives = 1
    this.type = 'mantis'
    this.damageTaken = 0

    //  Walk Image
    this.mantisImage = this.game.assets.mantis_MantisMove.data
    this.image = this.mantisImage

    // Hurt Image
    this.hurtImage = this.game.assets.mantis_MantisHurt.data

    // sprite Animation
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 0
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps
    this.walk = {
      frameY: 1,
      frames: 4,
    }

    // Flip sprite
    this.flip = false
  }

  hit(damage) {
    this.image = this.hurtImage
    this.damageTaken = damage
    console.log('damage:', damage)
    this.speed = 0
    this.isHurt = true
    setTimeout(() => {
      this.image = this.mantisImage
      this.isHurt = false
      this.speed = 2
    }, 1000)
  }

  update(player, player2, deltaTime) {
    const dx1 = player.x - this.x; // calculate the x distance to the player
    const dy1 = player.y - this.y; // calculate the y distance to the player
    const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1); // calculate the total distance to the player
    const dx2 = player2.x - this.x; // calculate the x distance to the second player
    const dy2 = player2.y - this.y; // calculate the y distance to the second player
    const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2); // calculate the total distance to the second player
    let dx;
    let dy;
    let distance;
    if (distance1 < distance2) {
      dx = dx1;
      dy = dy1;
      distance = distance1;
    } else {
      dx = dx2;
      dy = dy2;
      distance = distance2;
    }
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player

    // Mantis Animation
    if (speedX !== 0) {
      this.frameY = this.walk.frameY
      this.maxFrame = this.walk.frames
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

    this.x += speedX // move the enemy towards the player on the x axis
    this.y += speedY // move the enemy towards the player on the y axis

    if (speedX < 0) {
      this.flip = true
    } else {
      this.flip = false
    }
    if (this.lives <= 0) {
      this.markedForDeletion = true
    }
  }

  draw(context) {
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width * 1.5,
      this.height * 1.5
    )

    if (this.flip) {
      context.restore()
    }

    // Draw damage
    if (this.isHurt) {
      context.fillStyle = 'red'
      context.font = '20px Arial'
      context.fillText(this.damageTaken, this.x, this.y)
    }

    // Debug
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}


