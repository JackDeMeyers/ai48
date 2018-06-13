import { Direction } from "../2048/direction";
import { Game2048 } from "../2048/game";

export class Game2048AI {
  getBestMove(game: Game2048, runs: number): Direction {
    let highScore: number = 0;
    let bestMove: Direction = 0;

    for (let i: number = 0; i < 4; i++) {
      let score: number = this.multiRandomRun(game, runs, i);
      if (score > highScore) {
        highScore = score;
        bestMove = i;
      }
    }
    return bestMove;
  }

  multiRandomRun(game: Game2048, runs: number, dir: Direction): number {
    let totalScore: number = 0;

    for (let i: number = 0; i < runs; i++) {
      let runScore: number = this.randomRun(game, dir);
      if (runScore == null) { return null; }
      totalScore += runScore;
    }
    return totalScore;
  }

  randomRun(game: Game2048, dir: Direction): number {
    let clone: Game2048 = game.getClone();
    if (clone.swipe(dir)) {
      while (!clone.isGameOver()) {
        clone.swipe(Math.floor(Math.random() * 4));
      }
      return clone.score;
    }
    return null;
  }
}