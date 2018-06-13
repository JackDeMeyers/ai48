import { Game2048 } from "./2048/game";
import { Direction } from "./2048/direction";
import { Game2048AI } from "./ai/ai";
// import * as readlineSync from "readline-sync";

let highScore: number = 0;
let largest: number = 0;
let totalScore: number = 0;

const numTrials: number = 10;
const runs: number = 500;

for (let i: number = 0; i < numTrials; i++) {
  let game: Game2048 = new Game2048();
  let AI: Game2048AI = new Game2048AI();
  let moves: number = 0;
  game.display();

  while (!game.isGameOver()) {
    let dir: Direction = AI.AI_getBest(game, runs);
    game.swipe(dir);
    moves++;
  }
  console.log("Game Over. Score: ", game.score);
  console.log("Largest Tile: ", game.getLargest());
  console.log("Number of moves: ", moves);

  totalScore += game.score;
  highScore = Math.max(highScore, game.score);
  largest = Math.max(largest, game.getLargest());
}

console.log("\n--------------------Test Results--------------------");
console.log("Highest Score: ", highScore);
console.log("Largest Block: ", largest);
console.log("Avg. Score: ", totalScore / numTrials);
console.log("------------------------------------------------------");