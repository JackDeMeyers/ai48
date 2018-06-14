import { Block } from "./block";
import { Position } from "./position";
import { Direction } from "./direction";

/**
 * Implementation of the game 2048.
 */
export class Game2048 {
  private grid: Array<Array<Block>>;
  private needNew: Boolean;
  private _largest: number;
  private score: number;
  private render: Boolean;

  /**
   * Initialize the game.
   */
  constructor() {
    this.initGrid();
    this.needNew = false;
    this._largest = 2;
    this.score = 0;
    this.render = true;
  }

  /**
   * Return the game's grid.
   */
  getGrid(): Array<Array<Block>> {
    return this.grid;
  }

  /**
   * Return the game's score.
   */
  getScore(): number {
    return this.score;
  }

  /**
   * Return the largest block value.
   */
  getLargest(): number {
    return this._largest;
  }

  /**
   * Icrease the game's score by the given value.
   * @param s Value to increment score by.
   */
  addToScore(s: number): number {
    this.score += s;
    return this.score;
  }

  /**
   * Test if the given number is larger than _largest.
   * If true, set largest to the given number.
   * @param n Number to test.
   */
  private set largest(n: number) {
    if (n > this._largest) {
      this._largest = n;
    }
  }

  /**
   * Display the game to the console.
   */
  display(): void {
    if (this.render) {
      let grid: string = "";
      let len: number = this._largest.toString().length;

      let spc: string = Array(len + 1).join("_");
      for (let j: number = 0; j < 4; j++) {
        for (let i: number = 0; i < 4; i++) {
          let curBlock: Block = this.grid[i][j];
          if (!curBlock.open) {
            grid += curBlock.value + spc.substr(0, len - curBlock.value.toString().length) + "|";
          } else {
            grid += spc + "|";
          }
        }
        grid += "\n";
      }
      console.log(grid);
    }
  }

  /**
   * Return a clone of the current game.
   */
  getClone(): Game2048 {
    let clone: Game2048 = new Game2048();
    clone.render = false;
    clone.needNew = this.needNew;
    clone._largest = this._largest;
    clone.grid = this.createGrid();
    this.fillGrid(clone.grid);
    clone.score = this.score;
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        clone.grid[i][j].value = this.grid[i][j].value;
        clone.grid[i][j].open = this.grid[i][j].open;
        clone.grid[i][j].canCombine = this.grid[i][j].canCombine;
      }
    }
    return clone;
  }

  /**
   * Returns true if there are no more legal moves,
   * else false.
   */
  isGameOver(): Boolean {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        if (this.grid[i][j].open) {
          return false;
        } else {
          if (this.grid[i][j].canMove(Direction.Left, this.grid) ||
            this.grid[i][j].canMove(Direction.Right, this.grid) ||
            this.grid[i][j].canMove(Direction.Down, this.grid) ||
            this.grid[i][j].canMove(Direction.Up, this.grid)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * Perform a swipe action in the desired direction.
   * Return true if the swipe was successful, else false.
   * @param dir Swipe direction.
   */
  swipe(dir: Direction): Boolean {
    switch (dir) {
      case Direction.Left:
        this.swipeLeft();
        break;
      case Direction.Right:
        this.swipeRight();
        break;
      case Direction.Up:
        this.swipeUp();
        break;
      case Direction.Down:
        this.swipeDown();
        break;
    }
    this.resetCombineFlags();

    if (this.needNew) {
      this.addNewBlock();
      // this.display();
      return true;
    }
    return false;
  }

  /**
   * Swipe the board left.
   */
  private swipeLeft(): void {
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 0; i < 4; i++) {
        let curBlock: Block = this.grid[i][j];
        this.attemptMove(curBlock, Direction.Left);
      }
    }
  }

  /**
   * Swipe the board right.
   */
  private swipeRight(): void {
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 3; i >= 0; i--) {
        let curBlock: Block = this.grid[i][j];
        this.attemptMove(curBlock, Direction.Right);
      }
    }
  }

  /**
   * Swipe the board up.
   */
  private swipeUp(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        let curBlock: Block = this.grid[i][j];
        this.attemptMove(curBlock, Direction.Up);
      }
    }
  }

  /**
   * Swipe the board down.
   */
  private swipeDown(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 3; j >= 0; j--) {
        let curBlock: Block = this.grid[i][j];
        this.attemptMove(curBlock, Direction.Down);
      }
    }
  }

  /**
   * Attempt to move the current Block in the given direction.
   * @param curBlock Block to move.
   * @param dir Direction to move Block.
   */
  private attemptMove(curBlock: Block, dir: Direction): void {
    if (!curBlock.open) {
      while (curBlock.canMove(dir, this.grid)) {
        let neighbor: Block = curBlock.getNeighbor(dir, this.grid);
        this.largest = curBlock.moveTo(neighbor, this);
        curBlock = neighbor;
        this.needNew = true;
      }
    }
  }

  /**
   * Reset all Blocks' canCombine flags.
   */
  private resetCombineFlags(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        this.grid[i][j].resetCombineFlag();
      }
    }
  }

  /**
   * Initialize the grid to begin a new game.
   */
  private initGrid(): void {
    this.grid = this.createGrid();
    this.fillGrid(this.grid);
    this.addNewBlock(true);
    this.addNewBlock(true);
  }

  /**
   * Return a 4x4 Block grid.
   */
  private createGrid(): Array<Array<Block>> {
    let grid: Array<Array<Block>> = new Array(4);
    for (let i: number = 0; i < 4; i++) {
      grid[i] = new Array(4);
    }
    return grid;
  }

  /**
   * Fill a grid with new Blocks.
   * @param grid The grid to fill with new blocks.
   */
  private fillGrid(grid: Array<Array<Block>>): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        grid[i][j] = new Block(new Position(i, j));
      }
    }
  }

  /**
   * Add a value to a random open Block.
   * If twoFlag = true, value will be set to 2, else:
   *  25% chance value = 4, 75% chance value = 2.
   * @param twoFlag Optional - True if new Block should have value = 2.
   */
  private addNewBlock(twoFlag: Boolean = false): void {
    let p: Position = new Position();
    while (!this.grid[p.x][p.y].open) {
      p = new Position();
    }
    this.grid[p.x][p.y].value = twoFlag ? 2 : Math.random() >= 0.10 ? 2 : 4;
    this.grid[p.x][p.y].open = false;
    this.needNew = false;
  }
}
