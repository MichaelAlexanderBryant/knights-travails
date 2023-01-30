class Vertex {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.key = `${x}${y}`;
        this.neighbors = [];
    };
    addNeighbor(neighbor){
        this.neighbors.push(neighbor);
    };
};

class Graph {
    constructor() {
        this.verticies = {}
    };
    addVertex(vertex) {
        this.verticies[vertex.key] = vertex
    };
    addEdge(vertexOne, vertexTwo) {
        if (!(Object.keys(this.verticies).includes(vertexOne))) {
            this.addVertex(new Vertex(+vertexOne[0], +vertexOne[1]));
        };
        if (!(Object.keys(this.verticies).includes(vertexTwo))) {
            this.addVertex(new Vertex(+vertexTwo[0], +vertexTwo[1]));
        };
        this.verticies[vertexOne].addNeighbor(this.verticies[vertexTwo])
    };
};

testGraph = new Graph();

for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
        possibleMoves = [[x-2, y-1], [x-1, y-2], [x+1, y-2], [x+2,y-1], [x+2, y+1], [x+1, y+2], [x-1, y+2], [x-2, y+1]];
        for (let move = 0; move < possibleMoves.length; move++) {
            if ((possibleMoves[move][0] >= 0) && (possibleMoves[move][1] >= 0) &&
            (possibleMoves[move][0] <= 7) && (possibleMoves[move][1] <= 7)) {
                testGraph.addEdge(`${x}${y}`, `${possibleMoves[move][0]}${possibleMoves[move][1]}`);
            }
        };
    };
};
