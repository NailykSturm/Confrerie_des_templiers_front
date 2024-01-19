import { INode, Node } from "./Node";

export interface ISubNode extends INode {
    // attr: any
}

export class SubNode extends Node {
    // private _attr: any

    constructor(node: ISubNode) {
        super(node as INode);
    }

    // get attr(): any {
    //     return this._attr;
    // }

    override toString(): string {
        return `SubNode ${this.name}`;
    }

    override getAttributes(): object {
        return {
            ...super.getAttributes(),
            // attr: this.attr,
        };
    }
}
