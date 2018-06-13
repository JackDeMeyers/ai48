import { Direction } from "../2048/direction";
import { Game2048 } from "../2048/game";

export class Game2048AI {

  getBestMove(game: Game2048, runs: number): Direction {
    let bestScore: number = 0;
    let bestMove: Direction = null;

    for (let i: number = 0; i < 4; i++) {
      // score move position
      let score: number = this.multiRandomRun(game, i, runs);

      if (score >= bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
    return bestMove;
  }

  multiRandomRun(game: Game2048, direction: Direction, runs: number): number {
    let total: number = 0.0;
    let min: number = 1000000;
    let max: number = 0;

    for (let i: number = 0; i < runs; i++) {
      let s: number = this.randomRun(game, direction);
      if (s == null) {
        return null;
      }

      total += s;

      if (s < min) { min = s; }
      if (s > max) { max = s; }
    }

    let avg: number = total / runs;

    return avg;
  }

  randomRun(game: Game2048, direction: Direction): number {
    let g: Game2048 = game.getClone();
    let score: number = 0;
    let res: Boolean = this.move(g, direction);

    if (!res) {
      return null;
    }
    score += g.score;

    let moves: number = 1;
    while (true) {
      if (g.isGameOver()) { break; }

      let res: any = g.swipe(Math.floor(Math.random() * 4));
      if (!res.moved) { continue; }

      score += res.score;
      moves++;
    }
    return score;
  }

  move(game: Game2048, direction: Direction): Boolean {
    let test: Boolean = game.swipe(direction);
    return test;
  }

  AI_getBest(game: Game2048, runs: number): Direction {
    return this.getBestMove(game, runs);
  }
}