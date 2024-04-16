export class Coordinate {
    protected components: number[];

    constructor(...components: number[]) {
        this.components = components;
    }

    toString(): string {
        return `(${this.components.join(", ")})`;
    }

    // get index of component
    getComponentAtIndex(index: number): number {
      if(index >= this.components.length){
        throw new Error("getComponent : index >= this.components.length");
      }
      return this.components[index];
    }

    getComponents() : number[] {
      return this.components;
    }
}
