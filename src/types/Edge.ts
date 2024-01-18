/**
 * @abstract Edge class
 */

import { Node } from "./Node";

export class Edge {
    private _name: string;
    private _weight: number;
    private _node1: Node;
    private _node2: Node;

    constructor(name: string, weight: number, source: Node, target: Node) {
        this._name = name;
        this._weight = weight;
        this._node1 = source;
        this._node2 = target;
        this._node1.addEdge(this);
        this._node2.addEdge(this);
    }

    get name(): string {
        return this._name;
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

    getAttributes(): object {
        return {
            name: this.name,
            weight: this.weight,
            node1: this.node1,
            node2: this.node2,
        };
    }
}
