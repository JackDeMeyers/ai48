import { Position } from "./position";
import { Direction } from "./direction";

export class Block {
  private _val: number;
  open: Boolean;
  position: Position;
  canCombine: Boolean;

  get value(): number {
    return this.open ? null : this._val;
  }

  set value(x: number) {
    this._val = x;
  }

  constructor(pos: Position) {
    this.open = true;
    this._val = null;
    this.position = pos;
    this.canCombine = true;
  }

  resetCombineFlag(): void {
    this.canCombine = true;
  }

  canMove(dir: Direction, grid: Array<Array<Block>>): Boolean {
    const neighbor: Block = this.getNeighbor(dir, grid);
    if (neighbor === null) { return false; }
    return (neighbor.open || this.value === neighbor.value);
  }

  moveTo(block: Block): void {
    if (this._valuesMatch(block)) {
      if (block.canCombine) {
        block.value *= 2;
        block.canCombine = false;
        block.open = false;
        this.open = true;
      }
    } else {
      block.value = this.value;
      block.open = false;
      this.open = true;
    }
  }

  getNeighbor(dir: Direction, grid: Array<Array<Block>>): Block {
    let block: Block = null;
    switch (dir) {
      case Direction.Left:
        if (this.position.x !== 0) {
          return grid[this.position.x - 1][this.position.y];
        }
        break;
      case Direction.Right:
        if (this.position.x !== 3) {
          return grid[this.position.x + 1][this.position.y];
        }
        break;
      case Direction.Up:
        if (this.position.y !== 0) {
          return grid[this.position.x][this.position.y - 1];
        }
        break;
      case Direction.Down:
        if (this.position.y !== 3) {
          return grid[this.position.x][this.position.y + 1];
        }
        break;
    }
    return block;
  }

  private _valuesMatch(block: Block): Boolean {
    return this.value === block.value;
  }
}
