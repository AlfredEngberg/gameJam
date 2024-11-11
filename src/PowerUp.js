import Enemy from './Enemy'
import PowerUpImage from "./assets/sprites/PowerUp.png"

export default class PowerUp extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 32
    this.height = 32
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = 'red'
    this.type = 'powerup'


    this.frameX = 0
    this.frameY = 0
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    const image = new Image()
        image.src = PowerUpImage
        this.image = image
        this.flip = false
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
      this.width * 1,
      this.height * 1
      
       )
       if (this.game.debug) {
        context.fillText(`Frame: ${this.frameX}`, this.x, this.y - 10);
        context.fillText(`maxframe: ${this.maxFrame}`, this.x, this.y - 20);
        context.strokeRect(this.x, this.y, this.width, this.height)
    }
}


}
