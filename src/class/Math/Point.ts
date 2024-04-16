import { Vector } from './Vector.ts';
import { Coordinate } from './Coordinate.ts';

export class Point extends Coordinate {
  constructor(...components: number[]) {
      super(...components);
  }

  // Method to add two vectors
  add(other: Point): Point {
      if (this.components.length !== other.components.length) {
          throw new Error("Point dimensions must match");
      }
      const newComponents = this.components.map((comp, index) => comp + other.components[index]);
      return new Point(...newComponents);
  }

  // Method to subtract two vectors
  subtract(other: Point): Vector {
      if (this.components.length !== other.components.length) {
          throw new Error("Point dimensions must match");
      }
      const newComponents = this.components.map((comp, index) => comp - other.components[index]);
      return new Vector(...newComponents);
  }
}
