import InputHandler from './InputHandler.js'
import Player from './Player.js'
import Player2 from './Player2.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Beetle from './Beetle.js'
import RangedEnemy from './RangedEnemy.js'
import Boss from './Boss.js'
import Candy from './Candy.js'
/* import Stinger from './assets/sounds/Stinger.wav' */
import Background from './Background.js'
import Titlescreen from './Titlescreen.js'
/* import MainMusic from './assets/sounds/MainMusic.ogg'
import MenuMusic from './assets/sounds/MenuMusic.ogg' */
import HealthBar from './HealthBar.js'
import HealthBarP2 from './HealthBarP2.js'
import GameOverScreen from './GameOverScreen.js'
import WinScreen from './WinScreen.js'
import PowerUp from './PowerUp.js'
export default class Game {
  constructor(width, height, canvasPosition, assets) {
    this.assets = assets
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 0
    this.debug = false
    this.gameTime = 0
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.enemiesKilled = 0
    this.bossSpawned = false
    this.gameWin = false
    this.Titlescreen = new Titlescreen(this)
    this.background = new Background(this)
    this.sound = assets.Stinger_wav.data/* new Audio
    this.sound.src = Stinger */
    this.WinScreen = new WinScreen(this)
    this.HealthBar = new HealthBar(this)
    this.HealthBarP2 = new HealthBarP2(this)
    this.GameOverScreen = new GameOverScreen(this)
    this.PumpkinSound= assets.MantisHurt_wav.data
    this.RangedEnemySound = assets.RangedEnemyHit_wav.data
    this.DamageSound= assets.DamageSound_wav.data
    this.MainMusic = assets.MainMusic_ogg.data/* new Audio
    this.MainMusic.src = MainMusic */
    this.MenuMusic = assets.MenuMusic_ogg.data/* new Audio
    this.MenuMusic.src = MenuMusic */
    this.gameStart = false
    this.viewMainMenu = true
    this.viewControls = false
    this.viewCredits = false

    this.player = new Player(this)
    this.player2 = new Player2(this)

    this.enemyProjectiles = []
  }

  update(deltaTime) {
    this.GameOverScreen.update(deltaTime)
    this.HealthBar.update(deltaTime)
    this.HealthBarP2.update(deltaTime)
    if (!this.gameOver && this.gameStart === true) {
      this.gameTime += deltaTime
      /* this.MainMusic.play() */
    }


    if (this.gameStart === true && this.gameOver === false) {
      if (this.enemiesKilled === 10 && this.bossSpawned === false) {
        for (let i = 0; i < this.enemies.length; i++) {
          this.enemies[i].markedForDeletion = true
        }
        this.enemies.push(new Boss(this, 200, 100))
        this.sound.play();
        this.bossSpawned = true
        console.log('boss spawned')
      } else if (this.enemyTimer > this.enemyInterval && this.enemiesKilled < 10) {
        let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
        let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge
        if (x === 0) {
          y = Math.random() * this.height // if on left edge, randomize y position
        } else if (x === this.width) {
          y = Math.random() * this.height // if on right edge, randomize y position
        } else if (y === 0) {
          x = Math.random() * this.width // if on top edge, randomize x position
        } else {
          x = Math.random() * this.width // if on bottom edge, randomize x position
        }
        if (Math.random() > 0.5) {
          this.enemies.push(new Pumpkin(this, x, y))
        } else if (Math.random() < 0.3) {
          this.enemies.push(new Candy(this, x, y))
        } else if (Math.random() < 0.4) {
          this.enemies.push(new RangedEnemy(this, x, y))
        } else if (Math.random() < 0.9) {
          this.enemies.push(new Beetle(this, x, y))

        }
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
      this.player.update(deltaTime)
      this.player2.update(deltaTime)


      this.enemies.forEach((enemy, x, y) => {



        enemy.update(this.player, this.player2, deltaTime)
        if (enemy.markedForDeletion === true) {
          if (Math.random() > 0.3) {
            this.enemies.push(new PowerUp(this, enemy.x, enemy.y))
          }
        }


        if (this.checkCollision(this.player, enemy)) {
          this.DamageSound.play()
          if (enemy.type === 'powerup') {
            this.player.powerState = true

          }
          if (enemy.type !== 'boss') {
            enemy.markedForDeletion = true
          }
          if (enemy.type === 'mantis' || enemy.type === 'beetle' || enemy.type === 'ranged') {
            if (this.HealthBar.frameX >= 0) {
              this.HealthBar.frameX++
            }
            this.player.lives -= 1
          }
          if (enemy.type === 'candy') {
            if (this.HealthBar.frameX !== 0) {
              this.HealthBar.frameX--
            }
            this.player.lives += 1
            this.player.ammo += 5
          }
        }

        if (this.checkCollision(this.player2, enemy)) {
          this.DamageSound.play()
          if (enemy.type === 'powerup') {
            this.player2.powerStateP2 = true
          }
          if (enemy.type !== 'boss') {
            enemy.markedForDeletion = true
          }
          if (enemy.type === 'mantis' || enemy.type === 'beetle' || enemy.type === 'ranged') {
            if (this.HealthBarP2.frameX >= 0) {
              this.HealthBarP2.frameX++
            }
            this.player2.lives -= 1
          }
          if (enemy.type === 'candy') {
            if (this.HealthBarP2.frameX !== 0) {
              this.HealthBarP2.frameX--
            }
            this.player2.lives += 1
            this.player2.ammo += 5
          }
        }

        // Boss collision
        if (this.checkCollision(this.player, enemy) && this.bossSpawned === true) {
          enemy.speed = 0
          if (enemy.frameX === 12) {
            this.HealthBar.frameX++
            this.player.lives -= 1
            console.log('boss hit player 1')
          }
        }
        if (this.checkCollision(this.player2, enemy) && this.bossSpawned === true) {
          enemy.speed = 0
          if (enemy.frameX === 12) {
            this.HealthBarP2.frameX++
            this.player2.lives -= 1
            console.log('boss hit player 2')
          }
        }

        this.player.projectiles.forEach((projectile) => {
          if (this.checkProjectileCollision(projectile, enemy)) {
            if (enemy.type === 'rangedenemy') {
              this.RangedEnemySound.play()
            }
            if(enemy.type==='mantis'){
              this.PumpkinSound.play()
            }
            if (enemy.type = 'powerup') {
              this.powerState = true
            }
            enemy.hit(projectile.damage)
            if (enemy.lives >= 1) {
              enemy.lives -= projectile.damage
            } else {
              this.enemiesKilled++
              if (enemy.type !== 'boss') {
                enemy.markedForDeletion = true
              }
            }
            projectile.markedForDeletion = true
          }
        })
        this.player2.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            if (enemy.type = 'powerup') {
              this.powerStateP2 = true
            }
            enemy.hit(projectile.damage)
            if (enemy.lives >= 1) {
              enemy.lives -= projectile.damage
            } else {
              this.enemiesKilled++
              if (enemy.type !== 'boss') {
                enemy.markedForDeletion = true
              }
            }
          }
        })
      })
      this.enemyProjectiles.forEach((projectile) => {
        projectile.update(deltaTime)
        if (this.checkCollision(projectile, this.player)) {
          this.HealthBar.frameX++
          this.player.lives -= projectile.damage
          projectile.markedForDeletion = true
        }
        if (this.checkCollision(projectile, this.player2)) {
          this.HealthBarP2.frameX++
          this.player2.lives -= projectile.damage
          projectile.markedForDeletion = true
        }
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
      this.enemyProjectiles = this.enemyProjectiles.filter((projectile) => !projectile.markedForDeletion)
    }
  }

  draw(context) {

    if (this.gameOver === true) {
      this.GameOverScreen.draw(context)
    }

    if (this.gameStart !== true) {
      this.MenuMusic.play()
      this.Titlescreen.draw(context)
    }
    if (this.gameWin === true) {
      this.WinScreen.draw(context)
    }
    if (this.gameStart === true && this.gameOver !== true && this.gameWin !== true) {
      this.background.draw(context)

      this.MenuMusic.pause()

      this.player.draw(context)
      this.player2.draw(context)
      this.HealthBar.draw(context)
      this.HealthBarP2.draw(context)
      this.enemies.forEach((enemy) => {
        enemy.draw(context)
      })
      this.enemyProjectiles.forEach((projectile) => {
        projectile.draw(context)
      })
    }
    this.ui.draw(context)
  }

  checkProjectileCollision(projectile, object) {
    let angle = projectile.angle;
    let dx1 = projectile.width * Math.cos(angle);
    let dy1 = projectile.width * Math.sin(angle);
    let dx2 = projectile.height * -Math.sin(angle);
    let dy2 = projectile.height * Math.cos(angle);
    let x1 = projectile.x + dx1;
    let y1 = projectile.y + dy1;

    if (
      x1 > object.x &&
      x1 < object.x + object.width &&
      y1 > object.y &&
      y1 < object.y + object.height
    ) {
      return true;
    }

    let x2 = x1 + dx2;
    let y2 = y1 + dy2;

    if (
      x2 > object.x &&
      x2 < object.x + object.width &&
      y2 > object.y &&
      y2 < object.y + object.height
    ) {
      return true;
    }

    let x3 = x2 - dx1;
    let y3 = y2 - dy1;

    if (
      x3 > object.x &&
      x3 < object.x + object.width &&
      y3 > object.y &&
      y3 < object.y + object.height
    ) {
      return true;
    }

    if (
      projectile.x > object.x &&
      projectile.x < object.x + object.width &&
      projectile.y > object.y &&
      projectile.y < object.y + object.height
    ) {
      return true;
    }
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
