import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import boss from './boss.js'
import Candy from './Candy.js'
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
    this.enemiesKilled = 10
    this.bossSpawned = false


    this.gameStart = false
    this.viewMainMenu = true
    this.viewControls = false
    this.viewCredits = false

    this.player = new Player(this)
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
        this.bossSpawned = true
        console.log('boss spawned')
      } else {
        this.enemyTimer += deltaTime
      }
      this.player.update(deltaTime)

      this.enemies.forEach((enemy) => {
        enemy.update(this.player, deltaTime)
        if (this.checkCollision(this.player, enemy) && this.bossSpawned === false) {
          enemy.markedForDeletion = true
          if (enemy.type === 'candy') {
            this.player.ammo += 5
          }
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            if (enemy.lives > 1) {
              enemy.lives -= projectile.damage
            } else {
              this.enemiesKilled++
              enemy.markedForDeletion = true
            }
            projectile.markedForDeletion = true
          }
        })
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
    }
  }

  draw(context) {
    this.ui.draw(context)
    if (this.gameStart === true) {
      this.player.draw(context)
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
