import Enemy from './Enemy.js'
import walk from './assets/sprites/boss/boss.png'
import Laugh from './assets/sounds/BossLaugh.wav'

export default class boss extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 64
        this.height = 48
        this.x = x
        this.y = y
        this.speed = 2
        this.type = 'boss'
        this.lives = 15

        // boss Walk Image
        const walkImage = new Image()
        walkImage.src = walk
        this.image = walkImage

        // sprite Animation
        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 0
        this.fps = 20
        this.timer = 0
        this.interval = 1000 / this.fps
        this.walk = {
            frameY: 0,
            frameX: 0,
            frames: 7,
        }
        this.death = {
            frameY: 0,
            frameX: 20,
            frames: 29,
        }
        this.attack = {
            frameY: 0,
            frameX: 7,
            frames: 13,
        }

        // Flip sprite
        this.flip = false

        //boss sound
        this.sound = new Audio
        this.sound.src = Laugh


    }

    update(player, player2, deltaTime) {
        const dx1 = player.x - this.x; // calculate the x distance to the player
        const dy1 = player.y - this.y; // calculate the y distance to the player
        const distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1); // calculate the total distance to the player
        const dx2 = player2.x - this.x; // calculate the x distance to the second player
        const dy2 = player2.y - this.y; // calculate the y distance to the second player
        const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2); // calculate the total distance to the second player
        let dx;
        let dy;
        let distance;
        if (distance1 < distance2) {
            dx = dx1;
            dy = dy1;
            distance = distance1;
        } else {
            dx = dx2;
            dy = dy2;
            distance = distance2;
        }
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player

        // Animation
        if (speedX !== 0) {
            this.frameY = this.walk.frameY
            this.maxFrame = this.walk.frames
        } else {
            this.frameY = this.attack.frameY
            this.maxFrame = this.attack.frames
        }
        if (this.lives <= 0) {
            this.speed = 0
            this.frameY = this.death.frameY
            this.maxFrame = this.death.frames
        }

        if (this.timer > this.interval) {
            this.frameX++
            this.timer = 0
        } else {
            this.timer += deltaTime
        }

        if (this.frameX >= this.maxFrame) {
            if (this.lives <= 0) {
                this.markedForDeletion = true
                this.game.gameWin = true
                console.log('boss dead')
                console.log('game won')
                
            }
            this.sound.play()
            this.speed = 2
            this.frameX = 0
        }

        this.x += speedX // move the enemy towards the player on the x axis
        this.y += speedY // move the enemy towards the player on the y axis

        // flip sprite direction
        if (this.speedX < 0) {
            this.flip = true
        } else if (this.speedX > 0) {
            this.flip = false
        }

    }

    draw(context) {
        if (this.flip) {
            context.save()
            context.scale(-1, 1)
        }

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

        if (this.flip) {
            context.restore()
        }

        // boss Debug
        if (this.game.debug) {
            context.fillText(`Lives: ${this.lives}`, this.x, this.y - 30);
            context.fillText(`Frame: ${this.frameX}`, this.x, this.y - 10);
            context.fillText(`maxframe: ${this.maxFrame}`, this.x, this.y - 20);
            context.strokeRect(this.x, this.y, this.width, this.height)
        }
    }
}