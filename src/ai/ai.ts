import { Direction } from "../2048/direction";
import { Game2048 } from "../2048/game";

/**
 * Simple AI to play the game 2048. Simulates multiple games
 * to completion for each possible swipe direction each swipe,
 * and selects the direction which created the highest combined
 * score for random runs.
 */
export class Game2048AI {
  private numRuns: number;
  private game: Game2048;

  /**
   * Create a new instance of the 2048 AI.
   * @param game The game for the AI to play.
   * @param numRuns The number of games each simulation should play.
   */
  constructor(game: Game2048, numRuns: number) {
    this.game = game;
    this.numRuns = numRuns;
  }

  /**
   * Return the direction of the most probable best next move.
   */
  getBestMove(): Direction {
    let highScore: number = 0;
    let bestMove: Direction = 0;

    for (let dir: number = 0; dir < 4; dir++) {
      let score: number = this.runSimulation(dir);
      if (score > highScore) {
        highScore = score;
        bestMove = dir;
      }
    }
    return bestMove;
  }

  /**
   * Runs numRuns simulations to get an estimation of the
   * total score for the provided direction.
   * @param dir The direction to run the simulation for.
   */
  runSimulation(dir: Direction): number {
    let totalScore: number = 0;

    for (let i: number = 0; i < this.numRuns; i++) {
      let runScore: number = this.runClone(dir);
      if (runScore == null) { return null; }
      totalScore += runScore;
    }
    return totalScore;
  }

  /**
   * Run a clone of the current game to completion
   * using the provided direction as the initial swipe direction.
   * @param dir Initial swipe direction.
   */
  runClone(dir: Direction): number {
    let clone: Game2048 = this.game.getClone();
    if (clone.swipe(dir)) {
      while (!clone.isGameOver()) {
        clone.swipe(Math.floor(Math.random() * 4));
      }
      return clone.getScore();
    }
    return null;
  }
}
