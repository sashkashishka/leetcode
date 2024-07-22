class GV {
  private edges: GE[];

  constructor(private name: number) {
    this.edges = [];
  }

  public getKey() {
    return String(this.name);
  }

  public addEdge(edge: GE) {
    this.edges.push(edge);
  }

  public getEdges() {
    return this.edges;
  }

  public getNeighbours() {
    return this.edges.reduce<GV[]>((acc, curr) => {
      if (curr.start.getKey() === this.getKey()) {
        acc.push(curr.end);
      }

      return acc;
    }, []);
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

  getUniqueVertices() {
    return Object.values(this.vertices).reduce<string[]>((acc, curr) => {
      if (!acc.includes(curr.getKey())) {
        acc.push(curr.getKey())
      }

      return acc;
    }, []);
  }
}

function checkCycle(g: G) {
  let vertecies = g.getVertecies().slice();
  let finished: string[] = [];
  let visited: string[] = [];

  function removeFromVertecies(gv: GV) {
    vertecies = vertecies.filter(v => v.getKey() !== gv.getKey());
  }

  function dfs(start: GV): boolean {
    const neighbours = start.getNeighbours();

    if (finished.includes(start.getKey())) {
      removeFromVertecies(start);
      return false;
    }

    // check for back edge
    if (visited.includes(start.getKey())) {
      return true;
    }

    // there is no cycle if no neighbours
    if (neighbours.length === 0) {
      removeFromVertecies(start);
      return false
    }

    visited.push(start.getKey());
    removeFromVertecies(start);

    for (let nv of neighbours) {
      const result = dfs(nv);

      if (result) {
        return true;
      }
    }

    finished.push(start.getKey())

    return false;
  }

  while (vertecies.length > 0) {
    const [vertex] = vertecies;
    finished = [];
    visited = [];

    const result = dfs(vertex);

    if (result) {
      return true;
    }
  }

  return false;
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  if (prerequisites.length === 0) {
    return true;
  }

  const graph = new G();

  try {
    prerequisites.forEach(([a, b]) => {
      const va = graph.getVertex(String(a)) || new GV(a)
      const vb = graph.getVertex(String(b)) || new GV(b);

      const e = new GE(va, vb);

      graph.addEdge(e);
    });

    const isCycle = checkCycle(graph);

    if (isCycle) {
      return false;
    }

    return graph.getUniqueVertices().length <= numCourses;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export { canFinish }
