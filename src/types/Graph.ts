import { Node } from "./Node";
import { Edge } from "./Edge";
import { Game } from "./Game";
import { Location } from "./Location";
import { Support } from "./Support";
import { Character } from "./Character";
import { Timeline } from "./Timeline";
import { Faction } from "./Faction";

export enum NodeType {
    Node = "Node",
    Game = "Game",
    JeuPrincipal = "JeuPrincipal",
    SpinOff = "SpinOff",
    Concept = "Concept",
    Localisation = "Localisation",
    Support = "Support",
    Character = "Character",
    Timeline = "Timeline",
    Faction = "Faction",
}
export enum ResponseType {
    Nodes = "nodes",
    Edges = "edges",
}

export class Graph {
    private static _instance: Graph;
    private _nodes: Node[];
    private _edges: Edge[];
    private _categories: string[];

    private constructor() {
        this._nodes = [];
        this._edges = [];
        this._categories = [];
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
        this._categories = [];
        Object.keys(source).forEach((key) => {
            switch (key) {
                case ResponseType.Nodes:
                    source[key].forEach((node: any) => {
                        switch (node.type) {
                            case NodeType.JeuPrincipal:
                                this.nodes.push(new Game(node));
                                break;
                            case NodeType.SpinOff:
                                this.nodes.push(new Game(node));
                                break;
                            case NodeType.Concept:
                                this.nodes.push(new Node(node));
                                break;
                            case NodeType.Node:
                                this.nodes.push(new Node(node));
                                break;
                            case NodeType.Game:
                                this.nodes.push(new Game(node));
                                break;
                            case NodeType.Localisation:
                                this.nodes.push(new Location(node));
                                break;
                            case NodeType.Support:
                                this.nodes.push(new Support(node));
                                break;
                            case NodeType.Character:
                                this.nodes.push(new Character(node));
                                break;
                            case NodeType.Timeline:
                                this.nodes.push(new Timeline(node));
                                break;
                            case NodeType.Faction:
                                this.nodes.push(new Faction(node));
                                break;
                            default:
                                console.warn(`Node type ${node.type} not handled`);
                                console.log(node);
                                break;
                        }
                        if (!this._categories.includes(node.type)) this._categories.push(node.type);
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

        // console.log(this);
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
    get categories(): string[] {
        return this._categories;
    }

    getNodeById(id: number): Node | undefined {
        return this.nodes.find((node) => node.id === id);
    }
}
