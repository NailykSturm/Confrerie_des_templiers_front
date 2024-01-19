import { Component } from "vue";

import SupportVue from "../components/template/Support.vue";
import { INode, Node } from "./Node";

export interface ISupport extends INode {
    img: string;
}

export class Support extends Node {
    private _img: string;

    constructor(node: ISupport) {
        super(node as INode);
        this._img = node.img;
    }

    get img(): string {
        return this._img;
    }

    override get displayComponent(): Component {
        return SupportVue;
    }

    override toString(): string {
        return `Support ${this.name}`;
    }

    override getAttributes(): object {
        return {
            ...super.getAttributes(),
            img: this.img,
        };
    }
}
