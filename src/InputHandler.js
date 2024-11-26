import shootsound from './assets/sounds/Player2Shoot.wav'
import punchsound from './assets/sounds/Player1Punch.wav'
import selectsound from './assets/sounds/MenuSelection.wav'
export default class InputHandler {
  constructor(game) {
    this.game = game
    this.mouseX = 0
    this.mouseY = 0
    this.shootsound = new Audio
    this.shootsound.src = shootsound
    this.punchsound = new Audio
    this.punchsound.src = punchsound
    this.selectsound = new Audio
    this.selectsound.src = selectsound
    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'g' ||
          event.key === 'r' ||
          event.key === 'c' ||
          event.key === 'b' ||
          event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      // Player2 shooting
      if (event.key === ' ') {
        this.punchsound.play()
        this.game.player2.setState("shooting")
      }

      // Activate debug mode
      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }

      // For restarting the game
      if (event.key === 'r' && this.game.gameOver || this.game.gameWin) {
        for (let i = 0; i < this.game.enemies.length; i++) {
          this.game.enemies[i].markedForDeletion = true
        }

        this.game.gameOver = false
        this.game.gameStart = false
        this.game.gameWin = false
        this.game.viewMainMenu = true
        this.game.player.powerState = false
        this.game.player2.powerStateP2 = false
        this.game.player.lives = 7
        this.game.player2.lives = 7
        this.game.enemiesKilled = 0
        this.game.bossSpawned = false
        this.game.player.ammo = 20
        this.game.HealthBar.frameX = 0
        this.game.HealthBarP2.frameX = 0
        this.game.player.x = 100
        this.game.player.y = 100
        this.game.player2.x = 500
        this.game.player2.y = 500
        this.game.enemies = []
      }

      // For starting the game
      if (event.key === 'g') {
        this.selectsound.play()
        this.game.viewControls = false
        this.game.viewCredits = false
        this.game.viewMainMenu = false
        this.game.gameStart = true
        console.log('start game')
      }

      // For viewing the credits
      if (event.key === 'c' && this.game.gameStart === false) {
        this.selectsound.play()
        if (this.game.viewCredits === true) {
          this.game.viewCredits = false
        }
        this.game.viewControls = true
        this.game.viewMainMenu = false
      }

      // For viewing the controls
      if (event.key === 'v' && this.game.gameStart === false) {
        this.selectsound.play()
        if (this.game.viewControls === true) {
          this.game.viewControls = false
        }
        this.game.viewCredits = true
        this.game.viewMainMenu = false
      }

      // For going back to the main menu
      if (event.key === 'b') {
        this.selectsound.play()
        this.game.viewControls = false
        this.game.viewCredits = false
        this.game.viewMainMenu = true
      }
    })

    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })

    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX - this.game.canvasPosition.left
      this.mouseY = event.clientY - this.game.canvasPosition.top
    })

    // Player1 shooting
    window.addEventListener('mousedown', (event) => {
      this.shootsound.play()
      this.game.player.setState("shooting");
    })
  }
}
