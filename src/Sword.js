import powerPunch from "./assets/sprites/bullet.png"
export default class Sword {
    constructor(game, x, y, flip) {
        this.swordLegnth = 50
        this.game = game
        this.x = flip ? x - this.swordLegnth : x
        this.y = y - 5
        this.width = this.game.player2.width + this.swordLegnth
        this.height = this.game.player2.height + 10
        this.angle = 0
        this.markedForDeletion = false
        this.damage = 1
        this.frameX = 30
        this.spriteWidth = 36
        this.spriteHeight = 64
        const image = new Image()
        image.src = powerPunch
        this.powerPunch = powerPunch
        this.image = image
        this.timer = 0
        this.interval = 170
        this.flip = flip
    }

    update(deltaTime) {
        if (this.timer >= this.interval) {
            this.timer = 0
            this.frameX += 48
        } else {
            this.timer += deltaTime
        }

        if (this.game.player2.powerStateP2 === true) {
            if (this.game.player2.flip === true) {

                this.x -= 4
            } else {
                this.x += 4

            }

        }
    }

    draw(context) {
        context.save();
        if (this.flip) {

            context.scale(-1, 1)
        }

        context.drawImage(
            this.image,
            188 + this.frameX,
            346,
            this.spriteWidth,
            this.spriteHeight,
            this.flip ? this.x * -1 - this.width - 40 : this.x - 40,
            this.y,
            this.width,
            this.height
        )
        context.restore();
        context.fillStyle = '#ff0'
        //  context.fillRect(this.x, this.y, this.width, this.height)
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }
}