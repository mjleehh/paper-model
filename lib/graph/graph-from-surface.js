var sets = require('simplesets');
var _ = require('lodash');


function graphFromSurface(surface){
    var nodes = new sets.Set();
    var edges = [];

    var traverseNeighbouringFaces = function(faceIndex, parentFaceIndex){
        if (!nodes.has(faceIndex)) {
            nodes.add(faceIndex);
            if (parentFaceIndex !== undefined) {
                edges.push(_.sortBy([faceIndex, parentFaceIndex]));
            }
            var face = surface.getFace(faceIndex);
            _.forEach(face.connectedFaces, function(connectedFaceIndex){
                traverseNeighbouringFaces(connectedFaceIndex, faceIndex);
            });
        }
    };

    if (surface.numFaces > 0) {
        traverseNeighbouringFaces(0);
    }

    return {
        nodes: nodes.array(),
        edges: edges
    };
}

module.exports = graphFromSurface;