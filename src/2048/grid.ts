import { Direction } from "./direction";


export class Grid {
  private positions: Uint16Array;
  private combineFlags: Uint16Array;
  private values: Array<number>;

  constructor() {
    this.positions = new Uint16Array(16).fill(0);
    this.combineFlags = new Uint16Array(16).fill(0);
    this.values = new Array<number>(16);
  }

  resetCombineGrid(): void {
    this.combineFlags = new Uint16Array(16).fill(0);
  }

  addTile(pos: number, val: number): Boolean {
    if (this.positions[pos] === 0) {
      this.values[pos] = val;
      this.positions[pos] = 1;
      return true;
    }
    return false;
  }

  removeTile(pos: number): void {
    this.positions[pos] = 0;
  }

  getNeighborPosition(pos: number, dir: Direction): number {
    switch (dir) {
      case Direction.Up:
        if (pos <= 3) { return null; }
        return pos - 4;
      case Direction.Down:
        if (pos >= 12) { return null; }
        return pos + 4;
      case Direction.Left:
        if (pos % 4 === 0) { return null; }
        return pos - 1;
      case Direction.Right:
        if ((pos - 3) % 4 === 0) { return null; }
        return pos + 1;
      default:
        throw "Invalid direction";
    }
  }

  isNeighborOpen(neighborPos: number): Boolean {
    return this.positions[neighborPos] === 0;
  }

  getNeighborValue(neighborPos: number): number {
    return this.values[neighborPos];
  }

  canCombineNeighbor(pos: number, dir: Direction): Boolean {
    let neighborPos: number = this.getNeighborPosition(pos, dir);
    if (this.isNeighborOpen(neighborPos)) {
      return true;
    } else {
      if (this.values[pos] === this.values[neighborPos] && this.combineFlags[pos] === 0 && this.combineFlags[neighborPos]) {
        return true;
      }
      return false;
    }
  }

  combineIntoNeighbor(pos: number, dir: Direction): Boolean {
    if (this.canCombineNeighbor(pos, dir)) {
      let neighborPos: number = this.getNeighborPosition(pos, dir);
      if (this.isNeighborOpen(neighborPos)) {
        this.values[neighborPos] = this.values[pos];
        this.positions[pos] = 0;
        this.positions[neighborPos] = 1;
      } else {
        this.values[neighborPos] *= 2;
        this.positions[pos] = 0;
        this.positions[neighborPos] = 1;
      }
      return true;
    } else {
      return false;
    }
  }
}
