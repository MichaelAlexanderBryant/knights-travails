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

function populateGraph() {
    chessboard = new Graph();

    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            possibleMoves = [[x-2, y-1], [x-1, y-2], [x+1, y-2], [x+2,y-1], [x+2, y+1], [x+1, y+2], [x-1, y+2], [x-2, y+1]];
            for (let move = 0; move < possibleMoves.length; move++) {
                if ((possibleMoves[move][0] >= 0) && (possibleMoves[move][1] >= 0) &&
                (possibleMoves[move][0] <= 7) && (possibleMoves[move][1] <= 7)) {
                    chessboard.addEdge(`${x}${y}`, `${possibleMoves[move][0]}${possibleMoves[move][1]}`);
                }
            };
        };
    };
    return chessboard
};

function knightsTravails(start, target) {
    chessboard = populateGraph();
    let queue = [];
    queue.push(start);
    let visited = [];
    let path = [];
    while (queue.length > 0) {
        let currentVertex  = queue.shift();
        visited.push(currentVertex);
        if (currentVertex == target) {
            break;
        };
        for (let neighborNum = 0; neighborNum < chessboard.verticies[currentVertex].neighbors.length; neighborNum++) {
            neighbor = chessboard.verticies[currentVertex].neighbors[neighborNum];
            if (!(visited.includes(neighbor.key)) && !(queue.includes(neighbor.key))) {
                queue.push(neighbor.key);
                path.unshift([currentVertex, neighbor.key])
            };
        };
    };
    let currentPath;
    let finalPath = [target];
    currentVertex = target;
    while (currentVertex != start) {
      currentPath = path.shift();
      if (currentPath[1] == currentVertex) {
        finalPath.unshift(currentPath[0]);
        currentVertex = currentPath[0];
      };
    };
    return finalPath
};

console.log(knightsTravails("00", "77"))
