var _ = require('lodash');


function graphFromSurface(surface){
    var nodes = _.map(surface.faces, function(face, faceIndex){
        return {
            value: faceIndex,
            edges: []
        };
    });

    var edges = [];
    for (var j = 0; j < surface.numEdges; ++j) {
        var edge = surface.getEdge(j);
        if (!edge.isBorder) {
            var nodesIndices = edge.faces;
            var edgeIndex = edges.push(nodesIndices) - 1;
            _.forEach(nodesIndices, function(nodeIndex){
                nodes[nodeIndex].edges.push(edgeIndex);
            });
        }
    }

    return {
        nodes: nodes,
        edges: edges
    };
}

module.exports = graphFromSurface;