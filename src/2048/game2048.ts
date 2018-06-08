import { Block } from "./block";
import { Position } from "./position";

export class Game2048 {
  grid: Array<Array<Block>>;

  constructor() {
    this.grid = this.createGrid();
    this.initGrid();
  }

  showGame(): void {
    let grid = '';
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        grid += this.grid[i][j].value || '_';
        grid += '|';
      }
      grid += '\n';
    }
    console.log(grid);
  }

  swipeLeft(): void {
    let needNew: Boolean = false;
    // combine 
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        if (!this.grid[i][j].open) {
          for (let k = i + 1; k < 4; k++) {
            if (!this.grid[k][j].open) {
              if (this.valuesMatch(this.grid[i][j], this.grid[k][j])) {
                needNew = true;
                this.combine(this.grid[i][j], this.grid[k][j]);
              }
              break;
            }
          }
        }
      }
    }

    // move
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 4; i++) {
        if (this.grid[i][j].open) {
          for (let k = i + 1; k < 4; k++) {
            if (!this.grid[k][j].open && i != k) {
              needNew = true;
              this.grid[i][j].value = this.grid[k][j].value;
              this.grid[k][j].open = true;
              this.grid[i][j].open = false;
              break;
            }
          }
        }
      }
    }

    // add
    if (needNew == true) {
      this.addNew();
    }
  }

  swipeRight(): void {
    let needNew: Boolean = false;
    // combine 
    for (let j = 0; j < 4; j++) {
      for (let i = 3; i >= 0; i--) {
        if (!this.grid[i][j].open) {
          for (let k = i - 1; k >= 0; k--) {
            if (!this.grid[k][j].open) {
              if (this.valuesMatch(this.grid[i][j], this.grid[k][j])) {
                needNew = true;
                this.combine(this.grid[i][j], this.grid[k][j]);
              }
              break;
            }
          }
        }
      }
    }

    // move
    for (let j = 0; j < 4; j++) {
      for (let i = 3; i >= 0; i--) {
        if (this.grid[i][j].open) {
          for (let k = i - 1; k >= 0; k--) {
            if (!this.grid[k][j].open && i != k) {
              this.grid[i][j].value = this.grid[k][j].value;
              this.grid[k][j].open = true;
              this.grid[i][j].open = false;
              break;
            }
          }
        }
      }
    }

    // add
    if (needNew == true) {
      this.addNew();
    }
  }

  swipeUp(): void {
    let needNew: Boolean = false;
    // combine 
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (!this.grid[i][j].open) {
          for (let k = j + 1; k < 4; k++) {
            if (!this.grid[i][k].open) {
              if (this.valuesMatch(this.grid[i][j], this.grid[i][k])) {
                needNew = true;
                this.combine(this.grid[i][j], this.grid[i][k]);
              }
              break;
            }
          }
        }
      }
    }

    // move
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j].open) {
          for (let k = j + 1; k < 4; k++) {
            if (!this.grid[i][k].open && j != k) {
              needNew = true;
              this.grid[i][j].value = this.grid[i][k].value;
              this.grid[i][k].open = true;
              this.grid[i][j].open = false;
              break;
            }
          }
        }
      }
    }

    // add
    if (needNew == true) {
      this.addNew();
    }
  }

  swipeDown(): void {
    let needNew: Boolean = false;
    // combine 
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 0; j--) {
        if (!this.grid[i][j].open) {
          for (let k = j - 1; k >= 0; k--) {
            if (!this.grid[i][k].open) {
              if (this.valuesMatch(this.grid[i][j], this.grid[i][k])) {
                needNew = true;
                this.combine(this.grid[i][j], this.grid[i][k]);
              }
              break;
            }
          }
        }
      }
    }

    // move
    for (let i = 0; i < 4; i++) {
      for (let j = 3; j >= 0; j--) {
        if (this.grid[i][j].open) {
          for (let k = j - 1; k >= 0; k--) {
            if (!this.grid[i][k].open && j != k) {
              needNew = true;
              this.grid[i][j].value = this.grid[i][k].value;
              this.grid[i][k].open = true;
              this.grid[i][j].open = false;
              break;
            }
          }
        }
      }
    }

    // add
    if (needNew == true) {
      this.addNew();
    }
  }

  private addNew(): void {
    let p = new Position();
    while (!this.grid[p.x][p.y].open) {
      p = new Position();
    }
    this.grid[p.x][p.y].val = Math.random() >= 0.3 ? 2 : 4;
    this.grid[p.x][p.y].open = false;
  }

  private valuesMatch(b1: Block, b2: Block): Boolean {
    return b1.value == b2.value;
  }

  private combine(b1: Block, b2: Block) {
    b1.value *= 2;
    b2.open = true;
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
        this.grid[i][j] = new Block();
      }
    }
  }

  private setInitBlocks(): void {
    let p1 = new Position(3, 2);
    let p2;
    while (true) {
      p2 = new Position(3, 3);
      if (p1 != p2) break;
    }
    this.grid[p1.x][p1.y].open = false;
    this.grid[p1.x][p1.y].value = 2;
    this.grid[p2.x][p2.y].open = false;
    this.grid[p2.x][p2.y].value = 4;
  }
}
