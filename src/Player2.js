import Projectile from "./Projectile.js";
import Sword from "./Sword.js";
import knightIdle from "./assets/sprites/Gangsters_2/Idle.png";
import knightAttack from "./assets/sprites/Gangsters_2/Attack_1.png";
import knightRun from "./assets/sprites/Gangsters_2/Walk.png";
import knightDeath from "./assets/sprites/Gangsters_2/Dead.png";

export default class Player2 {
  constructor(game) {
    this.game = game;
    this.width = 40;
    this.height = 95;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height / 2 - this.height / 2;

    this.projectiles = [];

    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 8;

    this.maxAmmo = 20;
    this.ammo = 20;
    this.ammoTimer = 0;
    this.ammoInterval = 500;

    this.lives = 7;

    const imageIdle = new Image();
    imageIdle.src = knightIdle;
    this.image = imageIdle;
    const imageRun = new Image();
    imageRun.src = knightRun;
    this.image = imageRun;
    const imageAttack = new Image();
    imageAttack.src = knightAttack;
    this.image = imageAttack;
    const imageDeath = new Image();
    imageDeath.src = knightDeath;
    this.image = imageIdle;

    this.powerTimer = 0
    this.powerTimeLimit = 6000000
    this.powerState = false

    this.images = [imageIdle, imageRun, imageAttack, imageDeath];

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 7;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.animationFps = 12;
    this.animationTimer = 0;
    this.animationInterval = 1000 / this.animationFps;

    this.state = "idle";
    this.idle = {
      image: imageIdle,
      frames: 7,
    };
    this.running = {
      image: imageRun,
      frames: 10,
    };
    this.shooting = {
      image: imageAttack,
      frames: 6,
    };
    this.death = {
      image: imageDeath,
      frames: 10,
    };
  }

  update(deltaTime) {

    if (this.powerTimer < this.powerTimeLimit && this.powerState === true) {
      console.log("super mode is on")
      this.powerTimer += deltaTime
    } else {
      console.log("super mode is off")
      this.powerState = false
      this.powerTimer = 0

    }
    if (this.powerState === true) {
      this.height = 150

    }

    if (this.lives <= 0 && this.state !== "death") {
      this.setState("death");
      this.game.gameOver = true;
    }

    this.move();

    if (this.state !== "shooting") {
      if (this.speedX !== 0 || this.speedY !== 0) {
        this.setState("running");
      } else {
        this.setState("idle");
      }
    }

    if (this.animationTimer > this.animationInterval) {
      this.animationTimer = 0;
      this.frameX++;
      if (this.frameX === 3 && this.state === "shooting") {
        this.shoot(this.game.input.mouseX, this.game.input.mouseY);
        console.log(this.projectiles);
      }
      if (this.frameX >= (this.maxFrame)) {
        if (this.state === "shooting") {
          this.projectiles.pop();
          console.log(this.projectiles);
          this.setState("idle");
        }
        this.frameX = 0;
      }
    } else {
      this.animationTimer += deltaTime;
    }

    // ammo regeneration
    if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
      this.ammoTimer = 0;
      this.ammo++;
    } else {
      this.ammoTimer += deltaTime;
    }

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime);
    });
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );
  }

  move() {
    if (this.game.keys.includes("a")) {
      this.speedX = -this.maxSpeed;
      this.flip = true;
    } else if (this.game.keys.includes("d")) {
      this.flip = false;
      this.speedX = this.maxSpeed;
    } else {
      this.speedX = 0;
    }

    if (this.game.keys.includes("w")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.keys.includes("s")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;
    this.x += this.speedX;

    // keep player within canvas
    if (this.y < 0) {
      this.y = 0
    }
    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height
    }
    if (this.x < 0) {
      this.x = 0
    }
    if (this.x > this.game.width - this.width) {
      this.x = this.game.width - this.width
    }
  }

  draw(context) {
    if (this.powerState === true) {

      if (this.flip) {
        context.save();
        context.scale(-1, 1);
      }

      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.flip ? this.x * -1 - this.width - 40 : this.x - 40,
        this.y + 20,
        this.spriteWidth,
        this.spriteHeight,
      );

      context.restore();
    }

    if (this.game.gameOver !== true) {
      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });

      if (this.flip) {
        context.save();
        context.scale(-1, 1);
      }
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.flip ? this.x * -1 - this.width - 40 : this.x - 40,
        this.y - 55,
        this.spriteWidth,
        this.spriteHeight,
      );
      context.restore();

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
    }
  }

  shoot(mouseX, mouseY) {

    this.projectiles.push(new Sword(this.game, this.x, this.y, this.flip));
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
        this.state = "shooting";
        this.image = this.shooting.image;
        this.maxFrame = this.shooting.frames;
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

