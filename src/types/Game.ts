import GameVue from "../components/template/Game.vue";
import { Node, INode } from "./Node";

export interface IGame extends INode {
    date: string;
    img: string;
}

export class Game extends Node {
    private _date: string;
    private _img: string;

    constructor(game: IGame) {
        super(game as INode);
        this._date = game.date;
        this._img = game.img;
    }

    get date(): string {
        return this._date;
    }

    get img(): string {
        return this._img;
    }

    override get displayComponent() {
        return GameVue;
    }

    override toString(): string {
        return `Game ${this.name}`;
    }

    override getAttributes(): object {
        return {
            ...super.getAttributes(),
            date: this.date,
            img: this.img,
        };
    }
}
