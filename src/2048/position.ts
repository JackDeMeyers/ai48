export class Position {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x != null ? x : Math.floor(Math.random() * 3) + 1;
    this.y = y != null ? y : Math.floor(Math.random() * 3) + 1;
  }
}
