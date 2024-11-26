import Game from "./Game";
import Preloader from "./Preloader";
import Titlescreen from "./assets/sprites/Titlescreen.png";
import files from "../files.json";

export function setup(canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = 854;
  canvas.height = 480;

  const loadingScreen = new Image();
  loadingScreen.src = Titlescreen;
  loadingScreen.onload = () => {
    ctx.drawImage(loadingScreen, 0, 0, canvas.width, canvas.height);
  };
  
  const preloader = new Preloader();
const images = files.images
const sounds = files.sounds

images.forEach(image => {
  const path = './' + image;
  const name = image.replace("src/assets/sprites/", "").replaceAll("_", "").replaceAll("/","_").replaceAll(".png", "")
  preloader.addAsset(name, path, "image")
})

sounds.forEach(sound => {
  const path = './' + sound;
  const name = sound.replace("src/assets/sounds/", "").replaceAll("_", "").replaceAll("/","_").replaceAll(".", "_")
  preloader.addAsset(name, path, "sound")
})
  
  let lastTime = 0;
  let game;
  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  };

  preloader.load(
    (assets) => {
      // All assets loaded, initialize game
      console.log("All assets loaded", assets);
      game = new Game(
        canvas.width,
        canvas.height,
        canvas.getBoundingClientRect(),
        assets
      );
      animate(0);
    },
    (progress) => {
      // Update progress bar or loading screen
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(loadingScreen, 0, 0, canvas.width, canvas.height);
      ctx.textAlign = "center";
      ctx.fillStyle = "black";
      ctx.font = "70px Arial";
      ctx.fillText(`Loading progress: ${Math.floor(progress * 100)}%`, 427, 200);
      ctx.strokeRect(100,300,654,50);
      ctx.fillRect(100,300,654 * progress,50);
      console.log(`Loading progress: ${Math.floor(progress * 100)}%`);
    }
  );
}
