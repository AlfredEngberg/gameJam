export default class Sword {
    constructor (game, x, y, flip) {
        this.swordLegnth = 50
        this.game = game
        this.x = flip ? x - this.swordLegnth : x
        this.y = y - 5
        this.width = this.game.player2.width + this.swordLegnth
        this.height = this.game.player2.height + 10
        this.angle = 0
        this.markedForDeletion = false
        this.damage = 1
    }

    update(deltaTime) {
        if(this.game.player2.powerStateP2===true){
            console.log("swordcheck")
         this.x+=5
          
        }
    }

    draw(context) {
        context.fillStyle = '#ff0'
      //  context.fillRect(this.x, this.y, this.width, this.height)
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }
}