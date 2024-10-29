import InputHandler from './InputHandler.js'
import Player from './Player.js'
import Player2 from './Player2.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import boss from './boss.js'
import Candy from './Candy.js'
import Stinger from './assets/sounds/Stinger.wav'
import Background from './Background.js'
import Titlescreen from './Titlescreen.js'
export default class Game {
  constructor(width, height, canvasPosition) {
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
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.enemiesKilled = 0
    this.bossSpawned = false
this.Titlescreen = new Titlescreen(this)
this.background = new Background(this)
this.sound = new Audio 
    this.sound.src = Stinger

    this.gameStart = false
    this.viewMainMenu = true
    this.viewControls = false
    this.viewCredits = false

    this.player = new Player(this)
    this.player2 = new Player2(this)
  }

  update(deltaTime) {
    if (!this.gameOver && this.gameStart === true) {
      this.gameTime += deltaTime

    }

    if (this.gameStart === true) {
      if (this.enemyTimer > this.enemyInterval && this.enemiesKilled < 10) {
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
        if (Math.random() < 0.2) {
          this.enemies.push(new Candy(this, x, y))
        } else {
          this.enemies.push(new Pumpkin(this, x, y))
        }
        this.enemyTimer = 0
      } else if (this.enemiesKilled === 10 && this.bossSpawned === false) {
        this.enemies.push(new boss(this, 200, 100))
        this.sound.play();
        this.bossSpawned = true
        console.log('boss spawned')
      } else {
        this.enemyTimer += deltaTime
      }
      this.player.update(deltaTime)
      this.player2.update(deltaTime)

      this.enemies.forEach((enemy) => {

        enemy.update(this.player, this.player2, deltaTime)
        if (this.checkCollision(this.player, enemy) && this.bossSpawned === false) {

          enemy.markedForDeletion = true
          if (enemy.type === 'candy') {
            this.player.ammo += 5
          }
        }
        if (this.checkCollision(this.player2, enemy) && this.bossSpawned === false) {
          enemy.markedForDeletion = true
          if (enemy.type === 'candy') {
            this.player2.ammo += 5
          }
        }

        // Boss collision
        if (this.checkCollision(this.player, enemy) && this.bossSpawned === true) {
          enemy.speed = 0
          if (enemy.frameX === 12) {
            this.player.lives -= 1
            console.log('boss hit player 1')
          }
        }
        if (this.checkCollision(this.player2, enemy) && this.bossSpawned === true) {
          enemy.speed = 0
          if (enemy.frameX === 12) {
            this.player2.lives -= 1
            console.log('boss hit player 2')
          }
        }

        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            if (enemy.lives > 1) {
              enemy.lives -= projectile.damage
            } else {
              this.enemiesKilled++
              if (this.bossSpawned === false) {
                enemy.markedForDeletion = true
              }
            }
            projectile.markedForDeletion = true
          }
        })
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    }
  }

  draw(context) {
   if(this.gameStart!==true){
this.Titlescreen.draw(context)
}

 this.ui.draw(context)
    if (this.gameStart === true) {
      this.background.draw(context)
      this.ui.draw(context)
      this.player.draw(context)
      this.player2.draw(context)
      this.enemies.forEach((enemy) => {
        enemy.draw(context)
      })
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
