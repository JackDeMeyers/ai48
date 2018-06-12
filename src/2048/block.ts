import { Position } from "./position";
import { Direction } from "./direction";
import { Game2048 } from "./main";

/**
 * Class which contains the state for a block within the game's grid.
 */
export class Block {
  private _val: number;
  open: Boolean;
  position: Position;
  canCombine: Boolean;

  /**
   * Return null if the block is open,
   * else return the block's value.
   */
  get value(): number {
    return this.open ? null : this._val;
  }

  /**
   * Set this._val to the input number.
   */
  set value(x: number) {
    this._val = x;
  }

  /**
   * Create a block at the given position.
   * @param pos Position to create the block.
   */
  constructor(pos: Position) {
    this.open = true;
    this._val = null;
    this.position = pos;
    this.canCombine = true;
  }

  /**
   * Set this.canCombine = true.
   */
  resetCombineFlag(): void {
    this.canCombine = true;
  }

  /**
   * Return true if a Block can move in the given direction,
   * else return false.
   * @param dir Direction to attempt to move a Block.
   * @param grid Game's grid.
   */
  canMove(dir: Direction, grid: Array<Array<Block>>): Boolean {
    const neighbor: Block = this.getNeighbor(dir, grid);
    if (neighbor === null) { return false; }
    return ((neighbor.open && neighbor.canCombine && this.canCombine)
      || (this.value === neighbor.value && neighbor.canCombine && this.canCombine));
  }

  /**
   * Move current block to the destination block by:
   *  1) if moving into an empty block, just update the destination's value.
   *  2) if moving into a block to combine, double the destination's value.
   * Set flags according to move type.
   * Also update's the game's score.
   * @param block Destination Block.
   * @param game Game to update score.
   */
  moveTo(block: Block, game: Game2048): number {
    if (this._valuesMatch(block)) {
      if (block.canCombine && this.canCombine) {
        block.value *= 2;
        block.canCombine = false;
        block.open = false;
        this.open = true;
        game.addToScore(block.value);
      }
    } else {
      block.value = this.value;
      block.open = false;
      this.open = true;
    }
    return block.value;
  }

  /**
   * Return the current block's neighbor in the given direction.
   * If the neighbor DNE (ie. border block), return null.
   * @param dir Direction of neighbor.
   * @param grid Game's grid.
   */
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

  /**
   * Returns true if current Block's value and compare Block's
   * value are equal, else return false;
   * @param block Compare Block.
   */
  private _valuesMatch(block: Block): Boolean {
    return this.value === block.value;
  }
}
