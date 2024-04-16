export class Coordinate {
    protected components: number[];

    constructor(...components: number[]) {
        this.components = components;
    }

    getComponent(index: number): number {
        return this.components[index];
    }

    toString(): string {
        return `(${this.components.join(", ")})`;
    }
}
