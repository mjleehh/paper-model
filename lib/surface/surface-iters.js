function forEach(iter, handler){
    var elem;
    while ((elem = iter.next()) !== null){
        handler(elem);
    }
}
exports.forEach = forEach;

function faceEdgeCycle(firstEdgeIndex, surfaceImpl){
    var edgeIndex = firstEdgeIndex;
    return {
        next: function(){
            var retval = edgeIndex;

            if (edgeIndex !== null) {
                edgeIndex = surfaceImpl.halfEdges[edgeIndex].nextHalfEdge;
                if (edgeIndex === firstEdgeIndex) {
                    edgeIndex = null;
                }
            }
            return retval;
        }
    };
}
exports.faceEdgeCycle = faceEdgeCycle;