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

function Edge(edgeIndex, surfaceImpl){
    var getEdgeImpl = function(){
        return surfaceImpl.edges[edgeIndex];
    };

    this.isBorder = function(){
        return getEdgeImpl().length === 1;
    };

    this.__defineGetter__('faces', function(){
        return _.map(getEdgeImpl(), function(halfEdgeIndex){
            return surfaceImpl.halfEdges[halfEdgeIndex].face;
        });
    });
}

function Surface(surfaceImpl){
    // faces

    this.__defineGetter__('numFaces', function(){
        return surfaceImpl.faces.length;
    });

    this.__defineGetter__('faces', function(){
        return surfaceImpl.faces;
    });

    this.getFace = function(faceIndex){
        return new Face(faceIndex, surfaceImpl);
    };

    // edges

    var getEdges = function(){
        if (surfaceImpl.edges === undefined) {
            var edgesMap = {};
            _.forEach(surfaceImpl.halfEdges, function(halfEdge, halfEdgeIndex){
                var edge = halfEdge.twin === null ? [halfEdgeIndex] : _.sortBy([halfEdge.twin, halfEdgeIndex]);
                edgesMap[edge] = edge;
            });
            surfaceImpl.edges = _.values(edgesMap);
        }
        return surfaceImpl.edges;
    };

    this.__defineGetter__('numEdges', function(){
        return getEdges().length;
    });

    this.getEdge = function(edgeIndex){
        return new Edge(edgeIndex, surfaceImpl);
    };

    this.__defineGetter__('edges', function(){
        return getEdges();
    });
}
module.exports = Surface;