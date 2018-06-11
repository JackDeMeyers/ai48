import { Game2048 } from "./2048/game2048";
import { Direction } from "./2048/direction";

let game: Game2048 = new Game2048();
game.swipe(Direction.Down);
game.swipe(Direction.Up);
game.swipe(Direction.Down);
game.swipe(Direction.Up);
game.swipe(Direction.Down);
game.swipe(Direction.Up);