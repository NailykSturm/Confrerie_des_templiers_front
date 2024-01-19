import TimelineVue from "../components/template/Timeline.vue";
import { INode, Node } from "./Node";

export interface ITimeline extends INode {
    begin: number;
    end: number;
}

export class Timeline extends Node {
    private _begin: number;
    private _end: number;

    constructor(node: ITimeline) {
        super(node as INode);
        this._begin = node.begin;
        this._end = node.end;
    }

    get begin(): number {
        return this._begin;
    }
    get end(): number {
        return this._end;
    }

    override get displayComponent() {
        return TimelineVue;
    }

    override toString(): string {
        return `Timeline ${this.name}`;
    }

    override getAttributes(): object {
        return {
            ...super.getAttributes(),
            begin: this.begin,
            end: this.end,
        };
    }
}
