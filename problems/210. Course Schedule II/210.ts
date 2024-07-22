class GV {
  private edges: Map<string, GE>;

  constructor(private name: number) {
    this.edges = new Map()
  }

  public getKey() {
    return String(this.name);
  }

  public getName() {
    return this.name;
  }

  public addEdge(edge: GE) {
    this.edges.set(edge.getKey(), edge);
  }

  public getEdges() {
    return this.edges;
  }

  public removeEdge(edge: GE) {
    this.edges.delete(edge.getKey());
  }

  public getDescendants() {
    const descendants: GV[] = [];

    this.edges.forEach((edge) => {
      if (edge.start.getKey() === this.getKey()) {
        descendants.push(edge.end);
      }
    }, []);

    return descendants;
  }

  public getAncestors() {
    const ancestors: GV[] = [];

    this.edges.forEach((edge) => {
      if (edge.end.getKey() === this.getKey()) {
        ancestors.push(edge.start);
      }
    }, []);

    return ancestors;
  }
}

class GE {
  constructor(public start: GV, public end: GV) { }

  public getKey() {
    return `${this.start.getKey()}_${this.end.getKey()}`;
  }

  toString() {
    return JSON.stringify({
      key: this.getKey(),
      start: this.start.getKey(),
      end: this.end.getKey(),
    })
  }
}

class G {
  private edges: Record<string, GE>;

  private vertices: Record<string, GV>;

  constructor() {
    this.edges = {};
    this.vertices = {};
  }

  addVertex(vertex: GV) {
    this.vertices[vertex.getKey()] = vertex;
  }

  getVertex(key: string) {
    return this.vertices[key];
  }

  getVertecies() {
    return Object.values(this.vertices);
  }

  getTopVertices() {
    return Object.values(this.vertices).reduce<GV[]>((acc, curr) => {
      const neighbours = curr.getAncestors();

      if (neighbours.length === 0) {
        acc.push(curr);
      }

      return acc;
    }, []);
  }

  getBottomVertices() {
    return Object.values(this.vertices).reduce<GV[]>((acc, curr) => {
      const neighbours = curr.getDescendants();

      if (neighbours.length === 0) {
        acc.push(curr);
      }

      return acc;
    }, []);
  }

  getEdges() {
    return Object.values(this.edges);
  }

  addEdge(edge: GE) {
    let startVertex = this.getVertex(edge.start.getKey());
    let endVertex = this.getVertex(edge.end.getKey());

    if (!startVertex) {
      this.addVertex(edge.start);
      startVertex = this.getVertex(edge.start.getKey());
    }

    if (!endVertex) {
      this.addVertex(edge.end);
      endVertex = this.getVertex(edge.end.getKey());
    }

    if (this.edges[edge.getKey()]) {
      throw new Error('G: Edge already exists');
    }

    this.edges[edge.getKey()] = edge;

    startVertex.addEdge(edge);
    endVertex.addEdge(edge);
  }

  findEdge(start: GV, end: GV) {
    return Object.values(this.edges)
      .find(e => e.start.getKey() === start.getKey() && e.end.getKey() === end.getKey());
  }

  removeEdge(start: GV, end: GV) {
    const edge = this.findEdge(start, end);

    if (!edge) return;

    edge.start.removeEdge(edge);
    edge.end.removeEdge(edge);
    delete this.edges[edge.getKey()];
  }

  getUniqueVertices() {
    return Object.values(this.vertices).reduce<string[]>((acc, curr) => {
      if (!acc.includes(curr.getKey())) {
        acc.push(curr.getKey())
      }

      return acc;
    }, []);
  }

  static clone(g: G) {
    const graph = new G();

    const vertices = g.getVertecies();
    vertices.forEach(v => {
      const gv = new GV(v.getName())
      graph.addVertex(gv);
    });

    const edges = g.getEdges();
    edges.forEach(e => {
      const gvs = graph.getVertex(e.start.getKey());
      const gve = graph.getVertex(e.end.getKey());

      const ge = new GE(gvs, gve);

      graph.addEdge(ge);
    })

    return graph;
  }
}

function topologicalSearch(g: G) {
  const topVertecies = g.getTopVertices();
  const path: Set<number> = new Set();

  while (topVertecies.length > 0) {
    const vertex = topVertecies.pop()!;

    const descendants = vertex.getDescendants();

    path.add(vertex.getName());

    for (let dv of descendants) {
      g.removeEdge(vertex, dv);

      const ancestors = dv.getAncestors();

      if (ancestors.length === 0) {
        topVertecies.unshift(dv);
      }
    }
  }

  if (g.getEdges().length) {
    return [];
  }

  return [...path.values()].reverse();
}

function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const wholeCourse = Array.from({ length: numCourses }).map((_, i) => i);

  if (prerequisites.length === 0) {
    return wholeCourse;
  }

  const graph = new G();

  try {
    prerequisites.forEach(([a, b]) => {
      const va = graph.getVertex(String(a)) || new GV(a)
      const vb = graph.getVertex(String(b)) || new GV(b);

      const e = new GE(va, vb);

      graph.addEdge(e);
    });

    const path = topologicalSearch(G.clone(graph));

    if (path.length === 0) {
      return path;
    }

    let missingCourses: number[] = [];

    if (path.length < numCourses) {
      missingCourses = wholeCourse.filter(c => !path.includes(c));
    }

    return missingCourses.concat(path);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export { findOrder }
