import { Game2048 } from "./2048/main";
import { Direction } from "./2048/direction";
import * as readlineSync from "readline-sync";

let game: Game2048 = new Game2048();

while (!game.isGameOver()) {
  switch (readlineSync.question("Direction: ")) {
    case "w":
      game.swipe(Direction.Up);
      break;
    case "a":
      game.swipe(Direction.Left);
      break;
    case "s":
      game.swipe(Direction.Down);
      break;
    case "d":
      game.swipe(Direction.Right);
      break;
    default:
      break;
  }
}