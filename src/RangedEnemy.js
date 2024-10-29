import Enemy from './Enemy.js'
import EnemyProjectile from './EnemyProjectile.js'
import mantisImage from './assets/sprites/maggot/MaggotWalk.png'

export default class RangedEnemy extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 1
    this.lives = Math.floor(Math.random() * 1) + 1
    this.color = 'green'

    // Zombie Walk Image
    const image = new Image()
    image.src = mantisImage
    this.image = image

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
    this.death = {
      frameY: 3,
      frames: 9,
    }

    this.shootTimer = 0
    this.shootInterval = 1000 / 2
    this.shooting = false

    // Flip sprite
    this.flip = false
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

    this.shootTimer += deltaTime

    if (distance < 150 && this.shootTimer > this.shootInterval) {
      this.shoot(player.x, player.y)
      this.shootTimer = 0
    }




    // Zombie Animation
    if (speedX !== 0) {
      this.frameY = this.walk.frameY
      this.maxFrame = this.walk.frames
    } else {
      this.frameY = this.death.frameY
      this.maxFrame = this.death.frames
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
      this.flip = false
    } else {
      this.flip = true
    }
  }

  shoot(x, y) {
    const angle = Math.atan2(y - this.y + this.height / 2, x - this.x + this.width / 2)
    
    this.game.enemyProjectiles.push(
      new EnemyProjectile(this.game, this.x + this.width / 2, this.y + this.height/2, angle)
    )
  }


  draw(context) {
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.fillStyle = "green"
    //context.fillRect(this.flip? this.x * -1 - this.width: this.x, this.y, this.width, this.height)
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width * 1,
      this.height * 1
    )

    if (this.flip) {
      context.restore()
    }

    // zombie Debug
    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
    }
  }
}


