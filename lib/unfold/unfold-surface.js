var _ = require('lodash');
var surfaceIters = require('../surface/surface-iters');


function unfoldSurface(surface, tree){
    var mesh = {
        vertices: [],
        faces: []
    };
    var unfoldSubsurface = function(nodeIndex, baseEdge){
        var children = tree.nodes[nodeIndex].children;
        var face = surface.getFace(nodeIndex);

        var edgesIter = surfaceIters.faceEdgeCycle(baseEdge.id, surface.impl);
        edgesIter.next();

        surfaceIters.forEach(edgesIter, function(faceEdgeIndex){
            console.log('e', nodeIndex, faceEdgeIndex);
            var faceEdge = surface.getFaceEdge(faceEdgeIndex);
            var neighbour = faceEdge.neighbour.id;
            if (_.includes(children, neighbour)) {
                unfoldSubsurface(neighbour, faceEdge.twin);
            }
        });

        var meshVerticesIndices = _.map(face.vertices, function(vertexIndex){
            var vertex = surface.getVertex(vertexIndex);
            return mesh.vertices.push({
                x: vertex.x,
                y: vertex.y,
                z: vertex.z
            }) - 1;
        });

        mesh.faces.push({
            vertices: meshVerticesIndices
        });
    };
    unfoldSubsurface(tree.rootNode, surface.getFaceEdge(_.first(surface.getFace(tree.rootNode).edges)));

    return mesh;
}
module.exports = unfoldSurface;