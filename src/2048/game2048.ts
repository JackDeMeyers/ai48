import { Block } from "./block";
import { Position } from "./position";

export class Game2048 {
  grid: Array<Array<Block>>;

  constructor() {
    this.grid = this.createGrid();
    this.initGrid();
  }

  private createGrid(): Array<Array<Block>> {
    let grid = new Array(4);
    for (let i = 0; i < 4; i++) {
      grid[i] = new Array(4);
    }
    return grid;
  }

  private initGrid(): void {
    this.fillGrid();
    this.setInitBlocks();
  }

  private fillGrid(): void {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = new Block(i, j);
      }
    }
  }

  private setInitBlocks(): void {
    let p1 = new Position();
    let p2;
    while (true) {
      p2 = new Position();
      if (p1 != p2) break;
    }
    this.grid[p1.x][p1.y].open = false;
    this.grid[p1.x][p1.y].value = 2;
    this.grid[p2.x][p2.y].open = false;
    this.grid[p2.x][p2.y].value = 2;
  }
}
