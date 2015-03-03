var sets = require('simplesets');
var _ = require('lodash');


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

    this.__defineGetter__('faces', function(){
        return surfaceImpl.faces;
    });

    this.getFace = function(faceIndex){
        return new Face(faceIndex, surfaceImpl);
    };

    var edges = null;
    this.__defineGetter__('edges', function(){
        if (edges === null) {
            var edgesMap = new sets.Set();
            _.forEach(surfaceImpl.halfEdges, function(halfEdge, halfEdgeIndex){
                edgesMap.add(_.sortBy([halfEdge.twin, halfEdgeIndex]));
            });
            edges = edgesMap.array();
        }
        return edges;
    });
}
module.exports = Surface;