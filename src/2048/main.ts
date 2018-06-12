import { Block } from "./block";
import { Position } from "./position";
import { Direction } from "./direction";

/**
 * Implementation of the game 2048.
 * https://gabrielecirulli.github.io/2048/
 */
export class Game2048 {
  private _grid: Array<Array<Block>>;
  private _needNew: Boolean;
  private _largest: number;

  private set largest(n: number) {
    if (n > this._largest) {
      this._largest = n;
    }
  }

  /**
   * Initialize the game and display the state to the console.
   */
  constructor() {
    this._initGrid();
    this._needNew = false;
    this._largest = 2;
    this.display();
  }

  isGameOver(): Boolean {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        if (this._grid[i][j].open) {
          return false;
        } else {
          if (this._grid[i][j].canMove(Direction.Left, this._grid) ||
            this._grid[i][j].canMove(Direction.Right, this._grid) ||
            this._grid[i][j].canMove(Direction.Down, this._grid) ||
            this._grid[i][j].canMove(Direction.Up, this._grid)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * Display the game to the console.
   */
  display(): void {
    let grid: string = "";
    let len: number = this._largest.toString().length;

    let spc: string = Array(len + 1).join("_");
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 0; i < 4; i++) {
        let curBlock: Block = this._grid[i][j];
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
    this._resetCombineFlags();

    if (this._needNew) {
      this._addNewBlock();
      this.display();
    }
  }

  /**
   * Swipe the board left.
   */
  private _swipeLeft(): void {
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 0; i < 4; i++) {
        let curBlock: Block = this._grid[i][j];
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
        let curBlock: Block = this._grid[i][j];
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
        let curBlock: Block = this._grid[i][j];
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
        let curBlock: Block = this._grid[i][j];
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
      while (curBlock.canMove(dir, this._grid)) {
        let neighbor: Block = curBlock.getNeighbor(dir, this._grid);
        this.largest = curBlock.moveTo(neighbor);
        curBlock = neighbor;
        this._needNew = true;
      }
    }
  }

  /**
   * Reset all Blocks' canCombine flags.
   */
  private _resetCombineFlags(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        this._grid[i][j].resetCombineFlag();
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
    this._grid = new Array(4);
    for (let i: number = 0; i < 4; i++) {
      this._grid[i] = new Array(4);
    }
  }

  /**
   * Fill the grid with new Blocks.
   */
  private _fillGrid(): void {
    for (let i: number = 0; i < this._grid.length; i++) {
      for (let j: number = 0; j < this._grid[i].length; j++) {
        this._grid[i][j] = new Block(new Position(i, j));
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
    while (!this._grid[p.x][p.y].open) {
      p = new Position();
    }
    this._grid[p.x][p.y].value = twoFlag ? 2 : Math.random() >= 0.25 ? 2 : 4;
    this._grid[p.x][p.y].open = false;
    this._needNew = false;
  }
}
