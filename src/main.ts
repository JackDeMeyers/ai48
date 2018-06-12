import { Game2048 } from "./2048/main";
import { Direction } from "./2048/direction";
import { Game2048AI } from "./ai/main";
// import * as readlineSync from "readline-sync";

let game: Game2048 = new Game2048();
let AI: Game2048AI = new Game2048AI();
let moves: number = 0;
game.display();

while (!game.isGameOver()) {
  let dir: Direction = AI.AI_getBest(game, 500);
  game.swipe(dir);
  moves++;
}
console.log("Game Over. Score: ", game.score);
console.log("Largest Tile: ", game.getLargest());
console.log("Number of moves: ", moves);