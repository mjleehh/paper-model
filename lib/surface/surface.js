function Face(faceIndex, surfaceImpl){
    var forEdges = function(handler){
        var firstEdgeIndex = surfaceImpl.faces[faceIndex].firstHalfEdge;
        handler(firstEdgeIndex);

        var edgeIndex = surfaceImpl.halfEdges[firstEdgeIndex].nextHalfEdge;
        while (edgeIndex !== firstEdgeIndex) {
            handler(edgeIndex);
            edgeIndex = surfaceImpl.halfEdges[edgeIndex].nextHalfEdge;
        }
    };

    this.__defineGetter__('edges', function(){
        var retval = [];
        forEdges(function(edgeIndex){
            retval.push(edgeIndex);
        });
        return retval;
    });

    this.__defineGetter__('connectedFaces', function(){
        var retval = [];
        forEdges(function(edgeIndex){
            var twinIndex = surfaceImpl.halfEdges[edgeIndex].twin;
            if (twinIndex !== null) {
                retval.push(surfaceImpl.halfEdges[twinIndex].face);
            }
        });
        return retval;
    });
}

function Surface(surfaceImpl){
    this.__defineGetter__('numFaces', function(){
        return surfaceImpl.faces.length;
    });

    this.getFace = function(faceIndex){
        return new Face(faceIndex, surfaceImpl);
    };
}
module.exports = Surface;