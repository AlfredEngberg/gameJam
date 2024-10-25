import Projectile from './Projectile.js'
import spriteImage from './assets/sprites/playerSprite.png'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 64
    this.height = 64
    this.x = 30
    this.y = 100


    this.maxAmmo = 20
    this.ammo = 20
    this.ammoTimer = 0
    this.ammoInterval = 5000
    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 8
    this.jumpSpeed = 45
    this.grounded = false

    // adding sprite image
    const idleImage = new Image()
    idleImage.src = spriteImage
    this.image = idleImage

    // sprite animation
    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 0
    this.animationFps = 20
    this.animationTimer = 0
    this.animationInterval = 1000 / this.animationFps
    this.idle = {
      frameY: 0,
      frames: 4,
    }
    this.run = {
      frameY: 2,
      frames: 8,
    }
    this.attack = {
      frameY: 1,
      frames: 11,
    }

    // flip sprite direction
    this.flip = false

    // shooting
    this.shooting = false
  }

  update(deltaTime) {
    // Movement left and right
    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowRight') ||
      this.game.keys.includes('d')
    ) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    // movemeny up and down
    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
    } else if (
      this.game.keys.includes('ArrowDown') ||
      this.game.keys.includes('s')
    ) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    // play run or idle animation
    if (this.shooting) {
      this.maxFrame = this.attack.frames
      this.frameY = this.attack.frameY
      if (this.frameX === this.attack.frames - 1) {
        this.shooting = false
      }
    } else if (this.speedX !== 0) {
      this.maxFrame = this.run.frames
      this.frameY = this.run.frameY
    } else {
      this.maxFrame = this.idle.frames
      this.frameY = this.idle.frameY
    }

    this.y += this.speedY
    this.x += this.speedX

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )

    if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
      this.ammoTimer = 0
      this.ammo++
    } else {
      this.ammoTimer += deltaTime
    }

    // flip sprite direction
    if (this.speedX < 0) {
      this.flip = true
    } else if (this.speedX > 0) {
      this.flip = false
    }

    // sprite animation update
    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0
    } else {
      this.animationTimer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
  }

  draw(context) {
    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'black'
      context.font = '12px Arial'
      context.fillText(this.frameX, this.x, this.y - 5)
      context.fillText(this.grounded, this.x + 20, this.y - 5)
    }

    // draw sprite image
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    // s = source, d = destination
    // image, sx, sy, swidth, sheight, dx, dy, dwidth, dheight
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    context.restore()
  }


  shoot(mouseX, mouseY) {
    this.shooting = true
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    if (this.ammo > 0) {
      this.ammo--
      this.projectiles.push(
        new Projectile(
          this.game,
          this.x + this.width / 2,
          this.y + this.height / 2,
          angle
        )
      )
    } else {
      console.log('out of ammo')
    }
  }

}