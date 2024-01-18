import { ANode } from "./ANode";

export interface IGame {
    id: number;
    name: string;
    date: string;
    img: string;
}

export class Game extends ANode {
    private _date: string;
    private _img: string;

    constructor(game: IGame) {
        super(game.id, game.name);
        this._date = game.date;
        this._img = game.img;
    }

    get date(): string {
        return this._date;
    }

    get img(): string {
        return this._img;
    }

    toString(): string {
        return `Game ${this.name}`;
    }

    getAttributes(): object {
        throw new Error("Method not implemented.");
    }
}
