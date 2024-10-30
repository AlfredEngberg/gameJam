import HealthMeter from './assets/sprites/HealthBar.png'
import Game from './Game'
import Player from './Player'
export default class HealthBarP2{
    constructor(game, color) {
      this.player= new Player(this)
        this.game=game
        this.width = 48
        this.height = 20
        this.x = 400
        this.y = 10
    this.color=color
    
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 8
        this.fps = 20
        this.timer = 0
        this.interval = 1000 / this.fps

        const image = new Image()
        image.src = HealthMeter
        this.image = image
        this.flip = false
      }
    
    
      update(deltaTime,player,Pumpkin, boss, RangedEnemy ){
     
/* if(this.game.player.lives==9 && this.maxFrame>this.frameX){
  this.frameX+=1
}
 */

    /* if (this.timer > this.interval) {
      console.log(this.frameX)
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }*/
      } 
       
    
      draw(context) {
        

        context.drawImage(
          this.image,
          this.frameX * this.width,
          this.frameY * this.height,
          this.width,
          this.height,
          this.flip ? this.x * -1 - this.width : this.x,
          this.y,
          this.width * 2.5,
          this.height * 2.5
          
           )
           if (this.game.debug) {
            context.fillText(`Frame: ${this.frameX}`, this.x, this.y - 10);
            context.fillText(`maxframe: ${this.maxFrame}`, this.x, this.y - 20);
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }
   

}