import { Point } from './Point.ts';
import { Vector } from './Vector.ts';

export class Matrix {
  private data: number[][];

  constructor(data: number[][]) {
    this.data = data;
  }

  // Method to get a value at a specific position
  get(row: number, col: number): number {
    if (row >= this.data.length || col >= this.data[0].length) {
      throw new Error("Index out of bounds");
    }
    return this.data[row][col];
  }

  // Method to set a value at a specific position
  set(row: number, col: number, value: number): void {
    if (row >= this.data.length || col >= this.data[0].length) {
      throw new Error("Index out of bounds");
    }
    this.data[row][col] = value;
  }

  // Method to display the matrix
  toString(): string {
    return this.data.map(row => row.join(" ")).join("\n");
  }

  // Add another matrix to this matrix
  add(other: Matrix): Matrix {
    if (this.data.length !== other.data.length || this.data[0].length !== other.data[0].length) {
      throw new Error("Matrices dimensions do not match");
    }
    let result = this.data.map((row, i) => row.map((val, j) => val + other.get(i, j)));
    return new Matrix(result);
  }

  // Multiply this matrix by another matrix
  multiply(other: Matrix): Matrix {
    if (this.data[0].length !== other.data.length) {
      throw new Error("Matrices cannot be multiplied due to incompatible dimensions");
    }
    let result = new Array(this.data.length).fill(0).map(() => new Array(other.data[0].length).fill(0));

    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < other.data[0].length; j++) {
        for (let k = 0; k < this.data[0].length; k++) {
          result[i][j] += this.data[i][k] * other.get(k, j);
        }
      }
    }
    return new Matrix(result);
  }

  
}
