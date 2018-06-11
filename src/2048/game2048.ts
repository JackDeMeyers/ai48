import { Block } from "./block";
import { Position } from "./position";
import { Direction } from "./direction";

export class Game2048 {
  grid: Array<Array<Block>>;
  needNew: Boolean;

  constructor() {
    this._initGrid();
    this.needNew = false;
    this.display();
  }

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

  private _swipeLeft(): void {
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 0; i < 4; i++) {
        this._attemptSwipe(i, j, Direction.Left);
      }
    }
  }

  private _swipeRight(): void {
    for (let j: number = 0; j < 4; j++) {
      for (let i: number = 3; i >= 0; i--) {
        this._attemptSwipe(i, j, Direction.Right);
      }
    }
  }

  private _swipeUp(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        this._attemptSwipe(i, j, Direction.Up);
      }
    }
  }

  private _swipeDown(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 3; j >= 0; j--) {
        this._attemptSwipe(i, j, Direction.Down);
      }
    }
  }

  private _attemptSwipe(i: number, j: number, dir: Direction): void {
    let curBlock: Block = this.grid[i][j];
    if (!curBlock.open) {
      while (curBlock.canMove(dir, this.grid)) {
        let neighbor: Block = curBlock.getNeighbor(dir, this.grid);
        curBlock.moveTo(neighbor);
        curBlock = neighbor;
        this.needNew = true;
      }
    }
  }

  private _resetCombineFlags(): void {
    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        this.grid[i][j].resetCombineFlag();
      }
    }
  }

  private _initGrid(): void {
    this._createGrid();
    this._fillGrid();
    this._addNewBlock(true);
    this._addNewBlock(true);
  }

  private _createGrid(): void {
    this.grid = new Array(4);
    for (let i: number = 0; i < 4; i++) {
      this.grid[i] = new Array(4);
    }
  }

  private _fillGrid(): void {
    for (let i: number = 0; i < this.grid.length; i++) {
      for (let j: number = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = new Block(new Position(i, j));
      }
    }
  }

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
