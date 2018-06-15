import { Direction } from "./direction";


export class Grid {
  private grid: Uint16Array;
  private vals: Array<Number>;

  constructor() {
    this.grid = new Uint16Array(16).fill(0);
    this.vals = new Array<Number>(16);
  }
  addTile(pos: number, val: number): Boolean {
    if (this.grid[pos] === 0) {
      this.vals[pos] = val;
      this.grid[pos] = 1;
      return true;
    }
    return false;
  }

  removeTile(pos: number): void {
    this.grid[pos] = 0;
  }

  isNeighborOpen(pos: number, dir: Direction): Boolean {
    switch (dir) {
      case Direction.Up:
        if (pos <= 3) { return false; }
        let val: any = this.grid[pos - 4];
        return this.grid[pos - 4] === 0;
      case Direction.Down:
        if (pos >= 12) { return false; }
        return this.grid[pos + 4] === 0;
      case Direction.Left:
        if (pos % 4 === 0) { return false; }
        return this.grid[pos - 1] === 0;
      case Direction.Right:
        if ((pos - 3) % 4 === 0) { return false; }
        return this.grid[pos + 1] === 0;
      default:
        throw "Invalid direction";
    }
  }
}
