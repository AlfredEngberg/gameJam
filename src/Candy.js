import Enemy from "./Enemy";
export default class Candy extends Enemy {
  constructor(game, x, y) {
    super(game);
    this.width = 32;
    this.height = 32;
    this.x = x;
    this.y = y;
    this.speed = 0;
    this.lives = 1;
    this.color = "#0f0";
    this.type = "candy";

    this.frameX = 5;
    this.frameY = 0;
    this.maxFrame = 8;
    this.fps = 20;
    this.timer = 0;
    this.interval = 1000 / this.fps;

    this.image = this.game.assets.CandyImage.data;
    this.flip = false;
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
    );
    if (this.game.debug) {
      context.fillText(`Frame: ${this.frameX}`, this.x, this.y - 10);
      context.fillText(`maxframe: ${this.maxFrame}`, this.x, this.y - 20);
      context.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
