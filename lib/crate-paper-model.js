var Surface = require('./surface/surface');
var surfaceFromMesh = require('./surface/surface-from-mesh');
var Graph = require('./graph/graph');
var graphFromSurface = require('./graph/graph-from-surface');
var findSpanningTree = require('./tree/find-spanning-tree');
var unfoldSurface = require('./unfold/unfold-surface');


function createPaperModel(mesh){
    var surface = new Surface(surfaceFromMesh(mesh));
    var graph = new Graph(graphFromSurface(surface));
    var spanningTree = findSpanningTree(graph);
    return unfoldSurface(surface, spanningTree);
}
module.exports = createPaperModel;