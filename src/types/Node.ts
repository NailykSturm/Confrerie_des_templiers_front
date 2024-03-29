import NodeVue from "../components/template/Node.vue";
import { Edge } from "./Edge";
import { NodeType } from "./Graph";
import { DisplayType } from "./DisplayType";

export interface INode {
    id: number;
    name: string;
    type: NodeType;
}

/**
 * @abstract Node class
 */
export class Node extends DisplayType {
    private _id: number;
    private _name: string;
    private _edges: Edge[];
    private _type: NodeType;

    constructor(node: INode) {
        super();
        this._id = node.id;
        this._name = node.name;
        this._edges = [];
        this._type = node.type;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get edges(): Edge[] {
        return this._edges;
    }

    get type(): NodeType {
        return this._type;
    }

    get sumEdgesWeight(): number {
        return this._edges.reduce((acc, edge) => acc + edge.weight, 0);
    }

    addEdge(edge: Edge): void {
        this._edges.push(edge);
    }

    removeEdge(edge: Edge): void {
        this._edges = this._edges.filter((e) => e !== edge);
    }

    override get displayComponent() {
        return NodeVue;
    }

    override toString(): string {
        return `Node (${this.name})`;
    }

    override getAttributes(): object {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
        };
    }
}
