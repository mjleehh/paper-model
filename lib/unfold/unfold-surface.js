var _ = require('lodash');
var VertexMapper = require('./vertex-mapper');


function unfoldSurface(surface, tree){
    var vertices = [];
    var faceEdges = _.map(surface.faceEdges, function(faceEdge){
        return {
            nextHalfEdge: faceEdge.nextHalfEdge,
            prevHalfEdge: faceEdge.prevHalfEdge,
            face: faceEdge.face,
            twin: null
        };
    });

    var unfoldSubsurface = function(nodeIndex, parentIndex){
        var faceEdgeIndices = surface.getFace(nodeIndex).edges;
        var baseEdgeTwinIndex = null;
        var outBaseEdgeTwin = null;
        var vertexMapper = null;
        var baseEdgeEndIndex = null;
        var baseEdgeBeginIndex = null;

        // find edge connecting to parent
        if (parentIndex !== undefined) {
            var baseEdgeIndex = _.find(faceEdgeIndices, function(faceEdgeIndex){
                return surface.getFaceEdge(faceEdgeIndex).neighbour.id === parentIndex;
            });

            baseEdgeTwinIndex = surface.getFaceEdge(baseEdgeIndex).twin.id;
            outBaseEdgeTwin = faceEdges[baseEdgeTwinIndex];

            baseEdgeEndIndex = faceEdges[outBaseEdgeTwin.prevHalfEdge].vertex;
            baseEdgeBeginIndex = outBaseEdgeTwin.vertex;
            vertexMapper = new VertexMapper(surface.getFaceEdge(baseEdgeIndex),
                vertices[baseEdgeBeginIndex], vertices[baseEdgeEndIndex]);
        } else {
            vertexMapper = new VertexMapper(surface.getFaceEdge(
                _.first(faceEdgeIndices)),
                {x: 0, y: 0, z: 0},
                {x: 1, y: 0, z: 0}
            );
        }

        // map the face
        _.forEach(faceEdgeIndices, function(faceEdgeIndex){
            //console.log('e', nodeIndex, faceEdgeIndex);
            var inFaceEdge = surface.getFaceEdge(faceEdgeIndex);
            var outFaceEdge = faceEdges[faceEdgeIndex];

            if (faceEdgeIndex === baseEdgeIndex) {
                outFaceEdge.twin = baseEdgeTwinIndex;
                outBaseEdgeTwin.twin = faceEdgeIndex;
                outFaceEdge.vertex = baseEdgeEndIndex;
            } else if (inFaceEdge.nextFaceEdge.id === baseEdgeIndex) {
                outFaceEdge.vertex = baseEdgeBeginIndex;
            } else {
                var outVertex = vertexMapper(inFaceEdge.end);
                outVertex.firstHalfEdge = faceEdgeIndex;
                outFaceEdge.vertex = vertices.push(outVertex) - 1;
            }
        });

        // map subtree
        _.forEach(tree.nodes[nodeIndex].children, function(childIndex){
            unfoldSubsurface(childIndex, nodeIndex);
        });
    };
    unfoldSubsurface(tree.rootNode);

    return {
        vertices: vertices,
        halfEdges: faceEdges,
        faces: surface.impl.faces
    };
}
module.exports = unfoldSurface;