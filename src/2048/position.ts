/**
 * Simple class to hold an x and y value for the position of a Block.
 */
export class Position {
  x: number;
  y: number;

  /**
   * Create a new Position object. If optional params are left null,
   * coordinates are randomly generated.
   * @param x Optional - Allows the user to specify the x coordinate.
   * If left null, coordinate is randomly generated.
   * @param y Optional - Allows the user to specify the y coordinate.
   * If left null, coordinate is randomly generated.
   */
  constructor(x?: number, y?: number) {
    this.x = x != null ? x : Math.floor(Math.random() * 4);
    this.y = y != null ? y : Math.floor(Math.random() * 4);
  }
}
