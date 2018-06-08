import { Position } from "./position";

export class Block {
  open: Boolean;
  val: number;
  position: Position;

  get value() {
    return this.open ? null : this.val;
  }

  set value(x: number) {
    this.val = x;
  }

  constructor() {
    this.open = true;
    this.val = null;
  }
}
