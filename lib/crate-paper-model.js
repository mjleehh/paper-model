var _ = require('lodash');
var Surface = require('./surface/surface');
var surfaceFromMesh = require('./surface/surface-from-mesh');
var Graph = require('./graph/graph');
var graphFromSurface = require('./graph/graph-from-surface');
var findSpanningTree = require('./tree/find-spanning-tree');
var unfoldSurface = require('./unfold/unfold-surface');
var meshFromSurface = require('./mesh/mesh-from-surface');

function createPaperModel(mesh, statusHandler){
    if (statusHandler === undefined) {
        statusHandler = {
            nextTask: _.noop
        };
    }

    statusHandler.nextTask(0, 'loading mesh');
    var surface = new Surface(surfaceFromMesh(mesh));
    statusHandler.nextTask(1, 'get face graph');
    var graph = new Graph(graphFromSurface(surface));
    statusHandler.nextTask(2, 'find initial spanning tree');
    var spanningTree = findSpanningTree(graph);
    statusHandler.nextTask(3, 'unfolding surface');
    var unfoldedSurface =  new Surface(unfoldSurface(surface, spanningTree));
    return meshFromSurface(unfoldedSurface);
}
module.exports = createPaperModel;