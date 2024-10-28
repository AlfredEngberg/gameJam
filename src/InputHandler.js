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

      if (event.key === ' ') {
        this.punchsound.play()
        this.game.player2.setState("shooting")
      }

      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }

      if (event.key === 'g') {
        this.selectsound.play()
        this.game.viewControls = false
        this.game.viewCredits = false
        this.game.viewMainMenu = false
        this.game.gameStart = true
        console.log('start game')
      }
      if (event.key === 'c' && this.game.gameStart === false) {
        this.selectsound.play()
        if (this.game.viewCredits === true) {
          this.game.viewCredits = false
        }
        this.game.viewControls = true
        this.game.viewMainMenu = false
      }
      if (event.key === 'v' && this.game.gameStart === false) {
        this.selectsound.play()
        if (this.game.viewControls === true) {
          this.game.viewControls = false
        }
        this.game.viewCredits = true
        this.game.viewMainMenu = false
      }
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

    window.addEventListener('mousedown', (event) => {
      this.shootsound.play()
      this.game.player.setState("shooting");
    })
  }
}
