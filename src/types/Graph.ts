import { Node } from "./Node";
import { Edge } from "./Edge";
import { Game } from "./Game";

export enum NodeType {
    Node = "Node",
    Game = "Game",
}
export enum ResponseType {
    Nodes = "nodes",
    Edges = "edges",
}

export class Graph {
    private static _instance: Graph;
    private _nodes: Node[];
    private _edges: Edge[];

    private constructor() {
        this._nodes = [];
        this._edges = [];
    }

    static get instance(): Graph {
        if (!Graph._instance) {
            Graph._instance = new Graph();
        }
        return Graph._instance;
    }

    parseFromSource(source: any) {
        this._nodes = [];
        this._edges = [];
        Object.keys(source).forEach((key) => {
            switch (key) {
                case ResponseType.Nodes:
                    source[key].forEach((node: any) => {
                        switch (node.type) {
                            case NodeType.Game:
                                this.nodes.push(new Game(node));
                                break;
                            case NodeType.Node:
                                this.nodes.push(new Node(node));
                                break;
                            default:
                                console.warn(`Node type ${node.type} not handled`);
                                break;
                        }
                    });
                    break;
                case ResponseType.Edges:
                    source[key].forEach((edge: any) => {
                        const node1 = this.getNodeById(edge.id1);
                        const node2 = this.getNodeById(edge.id2);
                        // console.log(`id1: ${edge.id1} id2: ${edge.id2} | node1: ${node1} node2: ${node2}`);
                        if (node1 && node2) {
                            this.edges.push(new Edge(edge.name, edge.weight, node1, node2));
                        }
                    });
                    break;
                default:
                    console.warn(`Key ${key} not handled`);
                    break;
            }
        });

        console.log(this);
    }

    get nodesCount(): number {
        return this.nodes.length;
    }
    get nodes(): Node[] {
        return this._nodes;
    }
    get edges(): Edge[] {
        return this._edges;
    }

    getNodeById(id: number): Node | undefined {
        return this.nodes.find((node) => node.id === id);
    }
}
