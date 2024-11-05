import BackgroundGameOver from './assets/sprites/GameOver.png'
export default class GameOverScreen{
    constructor(game) {
        this.game=game
        this.width = 48
        this.height = 48
        this.x = 100
        this.y = -100
    
    
        const image = new Image()
        image.src = BackgroundGameOver
        this.image = image
        
        this.frameX = 0
    this.frameY = 0
    this.maxFrame = 27
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps
      }
    
    update(deltaTime){
        
      if (this.timer > this.interval) {
        this.frameX++
        this.timer = 0
      } else {
        this.timer += deltaTime
      }
  
      if (this.frameX >= this.maxFrame) {
        this.frameX = 0
      }
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
      this.width * 15,
      this.height * 15
      
       )
           
    }
}