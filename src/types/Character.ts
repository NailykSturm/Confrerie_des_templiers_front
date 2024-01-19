import CharacterVue from "../components/template/Character.vue";
import { INode, Node } from "./Node";

export interface ICharacter extends INode {
    img: string;
}

export class Character extends Node {
    private _img: string;

    constructor(node: ICharacter) {
        super(node as INode);
        this._img = node.img;
    }

    get img(): any {
        return this._img;
    }

    override get displayComponent() {
        return CharacterVue;
    }
    override toString(): string {
        return `Character ${this.name}`;
    }

    override getAttributes(): object {
        return {
            ...super.getAttributes(),
            img: this.img,
        };
    }
}
