export default class Sword {
    constructor (game, x, y, flip) {
        this.game = game
        this.x = flip ? x - 45 : x
        this.y = y - 10
        this.width = 80
        this.height = 60
        this.markedForDeletion = false
    }
    update() {

    }
    draw(context) {
        context.save()
        context.fillStyle = '#ff0'
        context.fillRect(this.x, this.y, this.width, this.height)
        context.restore()
    }
}