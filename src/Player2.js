import Projectile from "./Projectile.js";
import Sword from "./Sword.js";
import sprite from "./assets/sprites/gandalf_archer/GandalfHardcore Archer sheet.png";
import vampire from "./assets/sprites/vampire/vampire_2_edited.png";
import knightIdle from "./assets/sprites/knight/_Idle.png";
import knightAttack from "./assets/sprites/knight/_Attack.png";
import knightRun from "./assets/sprites/knight/_Run.png";
import knightDeath from "./assets/sprites/knight/_Death.png";

export default class Player2 {
  constructor(game) {
    this.game = game;
    this.width = 35;
    this.height = 45;
    this.x = this.game.width / 2 - this.width / 2;
    this.y = this.game.height / 2 - this.height / 2;

    this.projectiles = [];

    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 6;

    this.maxAmmo = 20;
    this.ammo = 20;
    this.ammoTimer = 0;
    this.ammoInterval = 500;

    this.lives = 10;

    const imageIdle = new Image();
    imageIdle.src = knightIdle;
    this.image = imageIdle;
    const imageRun = new Image();
    imageRun.src = knightRun;
    this.image = imageRun;
    const imageAttack = new Image();
    imageAttack.src = knightAttack;
    this.image = imageAttack;
    const imageDeath= new Image();
    imageDeath.src = knightDeath;
    this.image = imageDeath;

    this.images = [imageIdle, imageRun, imageAttack, imageDeath];

    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 10;
    this.spriteWidth = 120;
    this.spriteHeight = 80;
    this.animationFps = 12;
    this.animationTimer = 0;
    this.animationInterval = 1000 / this.animationFps;

    this.state = "idle";
    this.idle = {
      image: imageIdle,
      frames: 10,
    };
    this.running = {
      image: imageRun,
      frames: 10,
    };
    this.shooting = {
      image: imageAttack,
      frames: 4,
    };
    this.death = {
      image: imageDeath,
      frames: 10,
    };
  }

  update(deltaTime) {
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
      if (this.frameX === 1 && this.state === "shooting") {
        this.shoot(this.game.input.mouseX, this.game.input.mouseY);
      }
      if (this.frameX >= (this.maxFrame)) {
        if (this.state === "shooting") {
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
    if (this.game.keys.includes("ArrowLeft")) {
      this.speedX = -this.maxSpeed;
      this.flip = true;
    } else if (this.game.keys.includes("ArrowRight")) {
      this.flip = false;
      this.speedX = this.maxSpeed;
    } else {
      this.speedX = 0;
    }

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
      this.y -35,
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
        if (this.ammo <= 0) {
          console.log("out of ammo");
          this.setState("idle");
          break;
        }
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
