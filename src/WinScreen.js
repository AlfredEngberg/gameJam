import BackgroundWin from './assets/sprites/WinScreen.png'
export default class Background{
    constructor(game) {
        this.game=game
        this.width = this.game.width
        this.height = this.game.height
        this.x = 0
        this.y = 0
    
    
        const image = new Image()
        image.src = BackgroundWin
        this.image = image
        
      }
    
    
      
       
    
      draw(context) {
        context.drawImage(
             this.image,
             this.x,
             this.y,
             this.width,
             this.height
         
         
           )
    }
}