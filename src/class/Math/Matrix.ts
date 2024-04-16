import { Point } from './Point.ts';
import { Vector } from './Vector.ts';

/*Instanciate this class to build n*m matrix*/
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

  // Multiply this matrix by vector
  multiplyByVec(vec: Vector): Vector {
    if (this.data[0].length !== vec.getComponents().length) {
      throw new Error("Matrices cols and Vector msut be the same dimensions");
    }
    let result = new Array();

    for (let i = 0; i < this.data.length; i++) {
      let tmp : number;
      for (let j = 0; j < this.data[0].length; j++) {
        tmp += this.data[i][j] * vec.getComponentAtIndex(j);
      }
      result.push(tmp);
    }

    return new Vector(...result);
  }

  // Function to calculate the determinant of a 3x3 matrix
  determinant(): number {
    if (this.data.length !== 3 && this.data[0].length !== 3) throw new Error("Can Only inverse 3x3 Matrix");

    const a = this.data[0][0], b = this.data[0][1], c = this.data[0][2];
    const d = this.data[1][0], e = this.data[1][1], f = this.data[1][2];
    const g = this.data[2][0], h = this.data[2][1], i = this.data[2][2];

    return a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g);
  }

  // Function to calculate the inverse of a 3x3 matrix
  inverse(): Matrix {
    if (this.data.length !== 3 && this.data[0].length !== 3) throw new Error("Can Only inverse 3x3 Matrix");

    const det = this.determinant();
    if (det === 0) throw new Error("Matrix is not invertible.");

    const a = this.data[0][0], b = this.data[0][1], c = this.data[0][2];
    const d = this.data[1][0], e = this.data[1][1], f = this.data[1][2];
    const g = this.data[2][0], h = this.data[2][1], i = this.data[2][2];

    // Calculate the matrix of cofactors and then apply the transpose
    const inverseData = [
      [ (e*i - f*h), -(b*i - c*h),  (b*f - c*e)],
      [-(d*i - f*g),  (a*i - c*g), -(a*f - c*d)],
      [ (d*h - e*g), -(a*h - b*g),  (a*e - b*d)]
    ].map((row, index) => row.map((element) => element / det));

    // Transpose to get the adjugate matrix
    const adjugate = inverseData[0].map((_, colIndex) => inverseData.map(row => row[colIndex]));

    return new Matrix(adjugate);
  }

  static identity(size: number): Matrix {
    return new Matrix(Array.from({ length: size }, (_, i) => {
      return Array.from({ length: size }, (__, j) => i === j ? 1 : 0);
    }));
  }

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /*I will buils those function only for the 3x3 case to handle the Homogeneous
  Coordinates for the translation matrix*/

  static buildScaleMatrix(scale_coefficiants : number[]) : Matrix{
    if(scale_coefficiants.length !== 2){
      throw new Error("buildScaleMatrix : arguments array must be size of 2");
    }

    let result = Matrix.identity(3);
    result.set(0, 0, scale_coefficiants[0]);
    result.set(1, 1, scale_coefficiants[1]);

    return result;
  }

  /*This function will build a translation matrix*/
  static buildTransMatrix(rotation_coefficiants : number[]) : Matrix{
    if(rotation_coefficiants.length !== 2){
      throw new Error("buildTransMatrix : arguments array must be size of 2");
    }

    let result = Matrix.identity(3);
    result.set(0, 2, rotation_coefficiants[0]);
    result.set(1, 2, rotation_coefficiants[1]);

    return result;
  }

  /*This function will build a rotation matrix, args are given in deg*/
  static buildRotMatrix(rotation_coefficiant : number) : Matrix {
    let result = Matrix.identity(3);
    let c = Math.cos(rotation_coefficiant);
    let s = Math.sin(rotation_coefficiant);
    result.set(0, 0,  c);
    result.set(0, 1, -s);
    result.set(1, 0,  s);
    result.set(1, 1,  c);

    return result;
  }
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
}
