
export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'arial'
    this.color = 'white'
   this.bugfont= 'bugFont'
  }



  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    if (this.game.gameStart === true) {
      context.textAlign = 'left'
      context.font = `${this.fontSize}px ${this.fontFamily}`
      context.fillText(`P1 Lives: ${this.game.player.lives}`, 20, 30)
      context.fillText(`P2 Lives: ${this.game.player2.lives}`, 20, 150)
      context.fillText(`Ammo: ${this.game.player.ammo}`, 20, 60)
      context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 20, 90)
      context.fillText(`Enemies killed: ${this.game.enemiesKilled}`, 20, 120)
    }

    // Main menu
    if (this.game.gameStart === false && this.game.viewMainMenu === true) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      
      this.fontFamily='bugFont'
       this.color='lightgreen'
context.fillText(
  
  'BUGS VS GANGSTERS',
  
  this.game.width / 2,
  this.game.height / 2.8 - 20
)


      context.fillText(
        'Press "G" to start!',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
      context.fillText(
        'Press "C" to view controls',
        this.game.width / 2,
        this.game.height / 1.4 - 20
      )
      context.fillText(
        'Press "V" to view credits',
        this.game.width / 2,
        this.game.height / 1.1 - 20
      )
      context.fillText(
        'Press "G" to start!',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }

    // View Controls
    if (this.game.viewControls === true && this.game.viewCredits === false) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
// Player 1
      context.fillText(
        'Player 1:',
        this.game.width / 2,
        this.game.height / 3 - 20,
      )
      context.fillText(
        'Arrow keys to move, Click to shoot',
        this.game.width / 2,
        this.game.height / 2 - 20,
      )
// Player 2
      context.fillText(
        'Player 2:',
        this.game.width / 2,
        this.game.height / 1.4 - 20,
      )
      context.fillText(
        'WASD to move, Space to hit',
        this.game.width / 2,
        this.game.height / 1.2 - 20,
      )
// Back
      context.fillText(
        'press "B" to go back',
        this.game.width / 2,
        this.game.height / 1 - 20
      )
    }

    // View Credits
    if (this.game.viewCredits === true && this.game.viewControls === false) {
      context.textAlign = 'center'
      context.font = `30px ${this.fontFamily}`
/*       context.strokeRect(this.game.width / 4 - 150, this.game.height / 3, 750, 100)
 */      context.fillText(
        'Game created by:',
        this.game.width / 5,
        this.game.height / 5 - 20,
      )
      context.fillText(
        'Alfred Engberg',
        this.game.width / 5,
        this.game.height / 2.8 - 20,
      )
      context.fillText(
        'Noel Johansson',
        this.game.width / 5,
        this.game.height / 2 - 20,
      )
      context.fillText(
        'Fabian Sigfridsson',
        this.game.width / 5,
        this.game.height / 1.5 - 20,
      )
      context.fillText(
        'Sound made by:',
        this.game.width  -410,
                this.game.height / 5 - 20,
              )

              context.fillText(
                'davidkbd',
                this.game.width  -410,
                        this.game.height / 3.4 - 20,
                      )
                      context.fillText(
                        'Daniel SoundsGood',
                        this.game.width  -410,
                                this.game.height / 2.8 - 20,
                              )
                              context.fillText(
                                'JDWasabi',
                                this.game.width  -410,
                                        this.game.height / 2.4 - 20,
                                      )
                                      context.fillText(
                                        'YourPalRob',
                                        this.game.width  -410,
                                                this.game.height / 2.1 - 20,
                                              )
                                              context.fillText(
                                                'SnakeF8',
                                                this.game.width  -410,
                                                        this.game.height / 1.9 - 20,
                                                      )
                

      context.fillText(
'Sprites made by:',
this.game.width  -140,
        this.game.height / 5 - 20,
      )

      context.fillText(
        'Admurin',
        this.game.width  -140,
                this.game.height / 3.4 - 20,
              )

              context.fillText(
                'Lil-Cthulhu',
                this.game.width  -140,
                        this.game.height / 2.8 - 20,
                      )
                      context.fillText(
                        'Chesire',
                        this.game.width  -140,
                                this.game.height / 2.4- 20,
                              )
                              context.fillText(
                                'CraftPix',
                                this.game.width  -140,
                                        this.game.height / 2.1- 20,
                                      )
                                      context.fillText(
                                        'BDragon1727',
                                        this.game.width  -140,
                                                this.game.height / 1.9- 20,
                                              )

      context.fillText(
        'press "B" to go back',
        this.game.width / 2,
        this.game.height / 1.2 
      )
    }


    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `mouseX: ${this.game.input.mouseX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `mouseY: ${this.game.input.mouseY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
    }

    context.restore()
  }
}
