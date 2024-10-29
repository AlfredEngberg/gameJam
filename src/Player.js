import Projectile from './Projectile.js'
import spriteImage from './assets/sprites/playerSprite.png'
import knightIdle from "./assets/sprites/Gangsters_1/Idle.png";
import knightAttack from "./assets/sprites/Gangsters_1/Shot.png";
import knightRun from "./assets/sprites/Gangsters_1/Walk.png";
import knightDeath from "./assets/sprites/Gangsters_1/Dead.png";

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 45
    this.height = 95
    this.x = 30
    this.y = 100

    this.maxAmmo = 20
    this.ammo = 20
    this.ammoTimer = 0
    this.ammoInterval = 5000
    this.projectiles = []
    this.lives = 10

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 8
    this.jumpSpeed = 45
    this.grounded = false

    // Sprite images
    const imageIdle = new Image();
    imageIdle.src = knightIdle;

    const imageRun = new Image();
    imageRun.src = knightRun;

    const imageAttack = new Image();
    imageAttack.src = knightAttack;

    const imageDeath= new Image();
    imageDeath.src = knightDeath;
    this.image = imageIdle;

    // Sprite animation variables
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 6;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.animationFps = 12;
    this.animationTimer = 0;
    this.animationInterval = 1000 / this.animationFps;

    this.state = "idle";
    this.idle = {
      image: imageIdle,
      frames: 6,
    };
    this.running = {
      image: imageRun,
      frames: 10,
    };
    this.attack = {
      image: imageAttack,
      frames: 5,
    };
    this.death = {
      image: imageDeath,
      frames: 5,
    };

    // flip sprite direction
    this.flip = false

    // shooting
    this.shooting = false
  }

  update(deltaTime) {
    if (this.lives <= 0 && this.state !== "death") {
      this.setState("death");
      this.game.gameOver = true;
    }
    
    this.move()

    // play run or idle animation
    if (this.state === "shooting") {
      this.maxFrame = this.attack.frames
      this.image = this.attack.image
   
      if (this.frameX === this.attack.frames - 1) {
        this.shooting = false
      }
    } else if (this.speedX !== 0) {
      this.setState("running")
    } else {
      this.setState("idle")
    }

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
      if (this.frameX === 2 && this.state === "shooting") {
        this.shoot(this.game.input.mouseX, this.game.input.mouseY)
        this.setState("idle")
      }
    } else {
      this.animationTimer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      if (this.state === "shooting") {
        this.shooting = false
      }
      this.frameX = 0
    }
  }

  move() {
    // Movement left and right
    if (this.game.keys.includes("ArrowLeft")) {
      this.speedX = -this.maxSpeed;
      this.flip = true;
    } else if (this.game.keys.includes("ArrowRight")) {
      this.flip = false;
      this.speedX = this.maxSpeed;
    } else {
      this.speedX = 0;
    }

    // movemeny up and down
    if (this.game.keys.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;
    this.x += this.speedX;
  }

  draw(context) {
    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })

    if (this.game.debug) {
      context.strokeStyle = "#000";
      context.strokeRect(this.x, this.y, this.width, this.height);
      context.lineWidth = 1;
      context.beginPath();
      const dx = this.game.input.mouseX - (this.x + this.width / 2);
      const dy = this.game.input.mouseY - (this.y + this.height / 2);
      const maxLength = 60;
      const angle = Math.atan2(dy, dx);
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle);
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle);
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2);
      context.lineTo(x, y);
      context.stroke();
      context.fillText(`Frame: ${this.frameX}`, this.x, this.y - 10);
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
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.flip ? this.x * -1 - this.width - 40 : this.x - 40,
      this.y - 35,
      this.spriteWidth,
      this.spriteHeight,
    )

    context.restore()
  }

  shoot(mouseX, mouseY) {
    this.shooting = true
    let dx = mouseX - (this.x + this.width / 2)
    if (dx < 0) {
      this.flip = true
    } else {
      this.flip = false
    }
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
          dx < 0 ? this.y + this.height / 2 + 24: this.y + this.height / 2 - 24,
          angle
        )
      )
    } else {
      console.log('out of ammo')
    }
  }

  setState(state) {
    if (this.state === state) {
      return;
    }
    switch (state) {
      case "running":
        this.state = "running";
        this.image = this.running.image;
        this.maxFrame = this.running.frames;
        break;
      case "shooting":
        if (this.ammo <= 0) {
          console.log("out of ammo");
          this.setState("idle");
          break;
        }
        this.state = "shooting";
        this.shooting = true;
        this.image = this.attack.image;
        this.maxFrame = this.attack.frames;
        break;

      case "death":
        this.state = "death";
        this.image = this.death.image;
        this.maxFrame = this.death.frames;
        break;

      default:
        this.state = "idle";
        this.image = this.idle.image;
        this.maxFrame = this.idle.frames;
    }
    this.frameX = 0;
  }

}