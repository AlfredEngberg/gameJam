import RangedEnemy from "./RangedEnemy";
import Pumpkin from "./Pumpkin";
import Beetle from "./Beetle";
import Boss from "./Boss";
export default class Level {
    constructor(game) {
        this.game = game;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.killedEnemiesForNextLevel = 10;
    }

    update(deltaTime) {
        if (this.game.enemiesKilled >= this.killedEnemiesForNextLevel && !this.game.bossSpawned) {
            /* this.game.level++;
            this.game.enemiesKilled = 0;
            this.killedEnemiesForNextLevel = this.game.level * 5;
            this.enemyInterval *= 0.9; */
            this.game.enemies = this.game.enemies.filter(enemy => enemy.type === "powerup" || enemy.type === "candy");
            this.game.enemies.push(new Boss(this.game, this.game.width / 2, this.game.height / 2));
            this.game.bossSpawned = true;
        }
        if (this.game.bossSpawned) {
            return;
        }
        this.enemyTimer += deltaTime;
        if (this.enemyTimer > this.enemyInterval) {
            this.enemyTimer = 0;
            const spawn = Math.random();
            const side = Math.floor(Math.random() * 4);
            let x, y;
            switch (side) {
                case 0: // top
                    x = Math.random() * this.game.width;
                    y = -50;
                    break;
                case 1: // right
                    x = this.game.width;
                    y = Math.random() * this.game.height;
                    break;
                case 2: // bottom
                    x = Math.random() * this.game.width;
                    y = this.game.height;
                    break;
                case 3: // left
                    x = -50;
                    y = Math.random() * this.game.height;
                    break;
                default: // if side is invalid, spawn on top left corner
                    x = 0;
                    y = 0;
                    console.log("Error: Invalid side: ", side);
                    break;
            }
            if (spawn > 0.7) {
                this.game.enemies.push(new Beetle(this.game, x, y));
            } else if (spawn > 0.4) {
                this.game.enemies.push(new RangedEnemy(this.game, x, y));
            } else {
                this.game.enemies.push(new Pumpkin(this.game, x, y));
            }
        }
    }
}