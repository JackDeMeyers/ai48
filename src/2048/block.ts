import { Position } from "./position";

export class Block {
  open: Boolean;
  value: number;
  position: Position;

  constructor(x, y) {
    this.open = true;
    this.value = null;
    this.position = new Position(x, y);
  }
}
