import { NodeType } from "./Graph";
import { Node, NodeInterface } from "./Node";

export interface IGame {
    id: number;
    name: string;
    date: string;
    img: string;
    type: NodeType;
}

export class Game extends Node {
    private _date: string;
    private _img: string;

    constructor(game: IGame) {
        super(game as NodeInterface);
        this._date = game.date;
        this._img = game.img;
    }

    get date(): string {
        return this._date;
    }

    get img(): string {
        return this._img;
    }

    override toString(): string {
        return `Game ${this.name}`;
    }

    override getAttributes(): object {
        return {
            id: this.id,
            name: this.name,
            date: this.date,
            img: this.img,
            type: this.type,
        };
    }
}
