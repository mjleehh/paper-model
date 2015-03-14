var _ = require('lodash');


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

        if (parentIndex) {
            var baseEdgeIndex = _.find(faceEdgeIndices, function(faceEdgeIndex){
                return surface.getFaceEdge(faceEdgeIndex).neighbour.id === parentIndex;
            });

            //console.log(parentIndex, baseEdgeIndex);

            baseEdgeTwinIndex = surface.getFaceEdge(baseEdgeIndex).twin.id;
            outBaseEdgeTwin = faceEdges[baseEdgeTwinIndex];
        }

        _.forEach(faceEdgeIndices, function(faceEdgeIndex){
            //console.log('e', nodeIndex, faceEdgeIndex);
            var inFaceEdge = surface.getFaceEdge(faceEdgeIndex);
            var outFaceEdge = faceEdges[faceEdgeIndex];

            if (faceEdgeIndex === baseEdgeIndex) {
                //console.log('b', nodeIndex, faceEdgeIndex);
                outFaceEdge.twin = baseEdgeTwinIndex;
                outBaseEdgeTwin.twin = faceEdgeIndex;
                outFaceEdge.vertex = faceEdges[outBaseEdgeTwin.prevHalfEdge].vertex;
            } else if (inFaceEdge.nextFaceEdge.id === baseEdgeIndex) {
                outFaceEdge.vertex = outBaseEdgeTwin.vertex;
                //console.log('p', nodeIndex, faceEdgeIndex);
            } else {
                var inVertex = inFaceEdge.end;
                outFaceEdge.vertex = vertices.push({
                    firstHalfEdge: faceEdgeIndex,
                    x: inVertex.x,
                    y: inVertex.y,
                    z: inVertex.z
                }) - 1;
            }
        });

        _.forEach(tree.nodes[nodeIndex].children, function(childIndex){
            unfoldSubsurface(childIndex, nodeIndex);
        });

        /*
        var meshVerticesIndices = _.map(face.vertices, function(vertexIndex){
            var vertex = surface.getVertex(vertexIndex);
            return retval.vertices.push({
                x: vertex.x,
                y: vertex.y,
                z: vertex.z
            }) - 1;
        });
        */
    };
    unfoldSubsurface(tree.rootNode, null);

    return {
        vertices: vertices,
        halfEdges: faceEdges,
        faces: surface.impl.faces
    };
}
module.exports = unfoldSurface;