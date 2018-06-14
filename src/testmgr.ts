import { Game2048 } from "./2048/game";
import { Direction } from "./2048/direction";
import { Game2048AI } from "./ai/ai";
// import * as readlineSync from "readline-sync";

/**
 * Class to support testing of the AI and 2048 game.
 */
export class TestManager {

  private highScore: number;
  private largest: number;
  private totalScore: number;
  private totalMoves: number;
  private count1024: number;
  private count2048: number;
  private count4096: number;
  private count8192: number;
  private numTrials: number;
  private numSimRuns: number;
  private render: Boolean;

  /**
   * Create a new 2048 AI test instance.
   * @param numTrials Number of trials.
   * @param numSimRuns Number of simulation runs per trial.
   * @param render Whether to display every move to the console.
   */
  constructor(numTrials: number, numSimRuns: number, render: Boolean) {
    this.highScore = 0;
    this.largest = 0;
    this.totalScore = 0;
    this.totalMoves = 0;
    this.count1024 = 0;
    this.count2048 = 0;
    this.count4096 = 0;
    this.count8192 = 0;
    this.numTrials = numTrials;
    this.numSimRuns = numSimRuns;
    this.render = render;
  }

  /**
   * Run test.
   */
  main(): void {
    this.runTrials();
    this.outputResults();
  }

  /**
   * Updates global stats for the test manager.
   * @param game The current game.
   * @param numMoves The total number of moves in the current game.
   */
  private updateStats(game: Game2048, numMoves: number): void {
    this.totalScore += game.getScore();
    this.highScore = Math.max(this.highScore, game.getScore());
    this.largest = Math.max(this.largest, game.getLargest());
    this.totalMoves += numMoves;
    if (game.getLargest() >= 1024) { this.count1024++; }
    if (game.getLargest() >= 2048) { this.count2048++; }
    if (game.getLargest() >= 4096) { this.count4096++; }
    if (game.getLargest() >= 8192) { this.count8192++; }
  }

  /**
   * Run all test trials.
   */
  private runTrials(): void {
    for (let i: number = 0; i < this.numTrials; i++) {
      let game: Game2048 = new Game2048();
      let AI: Game2048AI = new Game2048AI(game, this.numSimRuns);
      let moves: number = 0;

      while (!game.isGameOver()) {
        let dir: Direction = AI.getBestMove();
        game.swipe(dir);
        if (this.render) {
          game.display();
        }
        moves++;
      }

      this.outputTrialResults(game, moves, i);
      this.updateStats(game, moves);
    }
  }

  /**
   * Display trial results to console.
   * @param game The current game.
   * @param moves The total number of moves in the current game.
   * @param trialNum The trial "id".
   */
  private outputTrialResults(game: Game2048, moves: number, trialNum: number): void {
    console.log("\n----------Trial #" + trialNum + " Results----------");
    console.log("Score: ", game.getScore());
    console.log("Largest Tile: ", game.getLargest());
    console.log("Number of moves: ", moves);
    console.log("\n Grid:");
    game.display();
    console.log("------------------------------------");
  }

  /**
   * Display full test results to console.
   */
  private outputResults(): void {
    console.log("\n--------------------Test Results--------------------");
    console.log("Trials: ", this.numTrials);
    console.log("Simulation Runs: ", this.numSimRuns);
    console.log("\nTotal Score: ", this.totalScore);
    console.log("Highest Score: ", this.highScore);
    console.log("Avg. Score: ", Math.round(this.totalScore / this.numTrials));
    console.log("Largest Block: ", this.largest);
    console.log("\nTotal Moves: ", this.totalMoves);
    console.log("Avg. Moves: ", Math.round(this.totalMoves / this.numTrials));
    console.log("\n1024 %: ", Math.round(this.count1024 / this.numTrials * 100));
    console.log("2048 %: ", Math.round(this.count2048 / this.numTrials * 100));
    console.log("4096 %: ", Math.round(this.count4096 / this.numTrials * 100));
    console.log("8192+ %: ", Math.round(this.count8192 / this.numTrials * 100));
    console.log("----------------------------------------------------");
  }
}
