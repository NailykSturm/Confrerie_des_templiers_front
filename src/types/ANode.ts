import { AEdge } from "./AEdge";

/**
 * @abstract Node class
 */
export abstract class ANode {
  private _name: string;
  private _edges: AEdge[];

  constructor(name: string) {
    this._name = name;
    this._edges = [];
  }

  get name(): string {
    return this._name;
  }

  get edges(): AEdge[] {
    return this._edges;
  }

  addEdge(edge: AEdge): void {
    this._edges.push(edge);
  }

  removeEdge(edge: AEdge): void {
    this._edges = this._edges.filter((e) => e !== edge);
  }

  abstract toString(): string;
}
