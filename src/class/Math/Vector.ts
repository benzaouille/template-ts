import { Coordinate } from './Coordinate.ts';

export class Vector extends Coordinate {
    constructor(...components: number[]) {
        super(...components);
    }

    // Method to get the magnitude of the vector
    magnitude(): number {
        return Math.sqrt(this.components.reduce((sum, component) => sum + component * component, 0));
    }

    // Method to add two vectors
    add(other: Vector): Vector {
        if (this.components.length !== other.components.length) {
            throw new Error("Vector dimensions must match");
        }
        const newComponents = this.components.map((comp, index) => comp + other.components[index]);
        return new Vector(...newComponents);
    }

    // Method to subtract two vectors
    subtract(other: Vector): Vector {
        if (this.components.length !== other.components.length) {
            throw new Error("Vector dimensions must match");
        }
        const newComponents = this.components.map((comp, index) => comp - other.components[index]);
        return new Vector(...newComponents);
    }

    // Method to scale the vector by a scalar
    scale(scalar: number): Vector {
        const newComponents = this.components.map(comp => comp * scalar);
        return new Vector(...newComponents);
    }
}
