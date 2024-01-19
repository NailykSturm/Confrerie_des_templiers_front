/**
 * @abstract Edge class
 */

import { DisplayType } from "./DisplayType";
import { Graph } from "./Graph";
import { Node } from "./Node";

export interface IEdge {
    label: string;
    weight: number;
    id1: number;
    id2: number;
}

export class Edge extends DisplayType {
    private _label: string;
    private _weight: number;
    private _node1: Node;
    private _node2: Node;

    constructor(edge: IEdge) {
        super();
        this._label = edge.label;
        this._weight = edge.weight;
        this._node1 = Graph.instance.getNodeById(edge.id1)!;
        this._node2 = Graph.instance.getNodeById(edge.id2)!;
        this._node1.addEdge(this);
        this._node2.addEdge(this);
    }

    get label(): string {
        return this._label;
    }

    get weight(): number {
        return this._weight;
    }

    get node1(): Node {
        return this._node1;
    }

    get node2(): Node {
        return this._node2;
    }

    toString(): string {
        return `Edge(${this.node1.name} - ${this.node2.name} : ${this.weight})`;
    }

    override getAttributes(): object {
        return {
            name: this.label,
            weight: this.weight,
            node1: this.node1,
            node2: this.node2,
        };
    }
}
