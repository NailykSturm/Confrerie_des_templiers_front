/**
 * @abstract Edge class
 */

import { ANode } from "./ANode";

export abstract class AEdge {
    private _name: string;
    private _weight: number;
    private _node1: ANode;
    private _node2: ANode;

    constructor(name: string, weight: number, source: ANode, target: ANode) {
        this._name = name;
        this._weight = weight;
        this._node1 = source;
        this._node2 = target;
    }

    get name(): string {
        return this._name;
    }

    get weight(): number {
        return this._weight;
    }

    get node1(): ANode {
        return this._node1;
    }

    get node2(): ANode {
        return this._node2;
    }

    abstract toString(): string;

    abstract getAttributes(): object;
}
