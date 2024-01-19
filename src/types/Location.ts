import { INode, Node } from "./Node";

export interface ILocation extends INode {
    images: Record<string, string>;
}

export class Location extends Node {
    private _images: Record<string, string>;

    constructor(location: ILocation) {
        super(location as INode);
        this._images = location.images;
    }

    get images(): Record<string, string> {
        return this._images;
    }

    override toString(): string {
        return `Location ${this.name}`;
    }

    override getAttributes(): object {
        return {
            ...super.getAttributes(),
            images: this.images,
        };
    }
}
