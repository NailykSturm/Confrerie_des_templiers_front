import { INode, Node } from "./Node";

export interface IFaction extends INode {
    description: string;
    img: string;
}

export class Faction extends Node {
    private _description: string;
    private _img: string;

    constructor(node: IFaction) {
        super(node as INode);
        this._description = node.description;
        this._img = node.img;
    }

    get description(): string {
        return this._description;
    }
    get img(): string {
        return this._img;
    }

    override toString(): string {
        return `Faction ${this.name}`;
    }

    override getAttributes(): object {
        return {
            ...super.getAttributes(),
            description: this.description,
            img: this.img,
        };
    }
}
