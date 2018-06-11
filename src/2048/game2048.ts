import { Block } from "./block";
import { Position } from "./position";
import { Direction } from "./direction";

/**
 * Implementation of the game 2048.
 * https://gabrielecirulli.github.io/2048/
 */
export class Game2048 {
  grid: Array<Array<Block>>;
  needNew: Boolean;

  /**
   * Initialize the game and display the state to the console.
   */
  constructor() {
    this._initGrid();
    this.needNew = false;
    this.display();
  }

  /**
   * Display the game to the console.
   */
  display(): void {
    let grid: string = "";
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 0; i < 4; i++) {
        grid += this.grid[i][j].value || "_";
        grid += "|";
      }
      grid += "\n";
    }
    console.log(grid);
  }

  /**
   * Perform a swipe action in the desired direction.
   * @param dir Swipe direction.
   */
  swipe(dir: Direction): void {
    switch (dir) {
      case Direction.Left:
        this._swipeLeft();
        break;
      case Direction.Right:
        this._swipeRight();
        break;
      case Direction.Up:
        this._swipeUp();
        break;
      case Direction.Down:
        this._swipeDown();
        break;
    }

    if (this.needNew) {
      this._addNewBlock();
      this.display();
    }
    this._resetCombineFlags();
  }

  /**
   * Swipe the board left.
   */
  private _swipeLeft(): void {
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 0; i < 4; i++) {
        let curBlock: Block = this.grid[i][j];
        this._attemptMove(curBlock, Direction.Left);
      }
    }
  }

  /**
   * Swipe the board right.
   */
  private _swipeRight(): void {
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 3; i >= 0; i--) {
        let curBlock: Block = this.grid[i][j];
        this._attemptMove(curBlock, Direction.Right);
      }
    }
  }

  /**
   * Swipe the board up.
   */
  private _swipeUp(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        let curBlock: Block = this.grid[i][j];
        this._attemptMove(curBlock, Direction.Up);
      }
    }
  }

  /**
   * Swipe the board down.
   */
  private _swipeDown(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 3; j >= 0; j--) {
        let curBlock: Block = this.grid[i][j];
        this._attemptMove(curBlock, Direction.Down);
      }
    }
  }

  /**
   * Attempt to move the current Block in the given direction.
   * @param curBlock Block to move.
   * @param dir Direction to move Block.
   */
  private _attemptMove(curBlock: Block, dir: Direction): void {
    if (!curBlock.open) {
      while (curBlock.canMove(dir, this.grid)) {
        let neighbor: Block = curBlock.getNeighbor(dir, this.grid);
        curBlock.moveTo(neighbor);
        curBlock = neighbor;
        this.needNew = true;
      }
    }
  }

  /**
   * Reset all Blocks' canCombine flags.
   */
  private _resetCombineFlags(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        this.grid[i][j].resetCombineFlag();
      }
    }
  }

  /**
   * Initialize the grid to begin a new game.
   */
  private _initGrid(): void {
    this._createGrid();
    this._fillGrid();
    this._addNewBlock(true);
    this._addNewBlock(true);
  }

  /**
   * Create the 4x4 Block grid.
   */
  private _createGrid(): void {
    this.grid = new Array(4);
    for (let i: number = 0; i < 4; i++) {
      this.grid[i] = new Array(4);
    }
  }

  /**
   * Fill the grid with new Blocks.
   */
  private _fillGrid(): void {
    for (let i: number = 0; i < this.grid.length; i++) {
      for (let j: number = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = new Block(new Position(i, j));
      }
    }
  }

  /**
   * Add a value to a random open Block.
   * If twoFlag = true, value will be set to 2, else:
   *  25% chance value = 4, 75% chance value = 2.
   * @param twoFlag Optional - True if new Block should have value = 2.
   */
  private _addNewBlock(twoFlag: Boolean = false): void {
    let p: Position = new Position();
    while (!this.grid[p.x][p.y].open) {
      p = new Position();
    }
    this.grid[p.x][p.y].value = twoFlag ? 2 : Math.random() >= 0.25 ? 2 : 4;
    this.grid[p.x][p.y].open = false;
    this.needNew = false;
  }
}
