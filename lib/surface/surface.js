var _ = require('lodash');


function Vertex(vertexIndex, surfaceImpl){
    var vertexImpl = surfaceImpl.vertices[vertexIndex];

    this.__defineGetter__('id', function(){
        return vertexIndex;
    });

    this.__defineGetter__('x', function(){
        return vertexImpl.x;
    });

    this.__defineGetter__('y', function(){
        return vertexImpl.y;
    });

    this.__defineGetter__('z', function(){
        return vertexImpl.z;
    });
}

// ---------------------------------------------------------------------------------------------------------------------

function Face(faceIndex, surfaceImpl){
    var faceImpl = surfaceImpl.faces[faceIndex];

    var forEdges = function(handler){
        var firstEdgeIndex = faceImpl.firstHalfEdge;
        handler(firstEdgeIndex);

        var edgeIndex = surfaceImpl.halfEdges[firstEdgeIndex].nextHalfEdge;
        while (edgeIndex !== firstEdgeIndex) {
            handler(edgeIndex);
            edgeIndex = surfaceImpl.halfEdges[edgeIndex].nextHalfEdge;
        }
    };

    this.__defineGetter__('id', function(){
        return faceIndex;
    });

    this.__defineGetter__('edges', function(){
        var retval = [];
        forEdges(function(edgeIndex){
            retval.push(edgeIndex);
        });
        return retval;
    });

    this.__defineGetter__('vertices', function(){
        var retval = [];
        forEdges(function(edgeIndex){
            retval.push(surfaceImpl.halfEdges[edgeIndex].vertex);
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

// ---------------------------------------------------------------------------------------------------------------------

function FaceEdge(faceEdgeIndex, surfaceImpl){
    var faceEdgeImpl = surfaceImpl.halfEdges[faceEdgeIndex];

    this.__defineGetter__('id', function(){
        return faceEdgeIndex;
    });

    this.__defineGetter__('neighbour', function(){
        var twinIndex = faceEdgeImpl.twin;
        return twinIndex === null ? null : new Face(surfaceImpl.halfEdges[twinIndex].face, surfaceImpl);
    });
}

// ---------------------------------------------------------------------------------------------------------------------

function Edge(edgeIndex, surfaceImpl){
    var edgeImpl = surfaceImpl.edges[edgeIndex];

    this.__defineGetter__('id', function(){
        return edgeIndex;
    });

    this.__defineGetter__('isBorder', function(){
        return edgeImpl.length === 1;
    });

    this.__defineGetter__('faces', function(){
        return _.map(edgeImpl, function(halfEdgeIndex){
            return surfaceImpl.halfEdges[halfEdgeIndex].face;
        });
    });
}

// ---------------------------------------------------------------------------------------------------------------------

function Surface(surfaceImpl){
    // vertices

    this.__defineGetter__('numVertices', function(){
        return surfaceImpl.vertices.length;
    });

    this.getVertex = function(vertexIndex){
        return new Vertex(vertexIndex, surfaceImpl);
    };

    this.__defineGetter__('vertices', function(){
        return surfaceImpl.vertices;
    });

    // face edges

    this.__defineGetter__('numFaceEdges', function(){
        return surfaceImpl.halfEdges.length;
    });

    this.getFaceEdge = function(faceEdgeIndex){
        return new FaceEdge(faceEdgeIndex, surfaceImpl);
    };

    this.__defineGetter__('faceEdges', function(){
        return surfaceImpl.halfEdges;
    });

    // faces

    this.__defineGetter__('numFaces', function(){
        return surfaceImpl.faces.length;
    });

    this.getFace = function(faceIndex){
        return new Face(faceIndex, surfaceImpl);
    };

    this.__defineGetter__('faces', function(){
        return surfaceImpl.faces;
    });

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
        getEdges();
        return new Edge(edgeIndex, surfaceImpl);
    };

    this.__defineGetter__('edges', function(){
        return getEdges();
    });
}
module.exports = Surface;