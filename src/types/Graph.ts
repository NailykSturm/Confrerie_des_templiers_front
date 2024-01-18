import { ANode } from "./ANode";
import { AEdge } from "./AEdge";
import { Game } from "./Game";

export class Graph {
    private static _instance: Graph;
    private _nodes: ANode[];
    private _edges: AEdge[];

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
                case "games":
                    source[key].forEach((game: any) => {
                        this.nodes.push(new Game(game));
                    });
                    break;
                default:
                    console.warn(`Key ${key} not handled`);
                    break;
            }
        });
    }

    get nodesCount(): number {
        return this.nodes.length;
    }
    get nodes(): ANode[] {
        return this._nodes;
    }
    get edges(): AEdge[] {
        return this._edges;
    }
}
