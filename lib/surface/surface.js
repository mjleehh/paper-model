var _ = require('lodash');
var accessors = require('./accessors');


// ---------------------------------------------------------------------------------------------------------------------

function Surface(surfaceImpl){
    this.__defineGetter__('impl', function(){
        return surfaceImpl;
    });

    // vertices

    this.__defineGetter__('numVertices', function(){
        return surfaceImpl.vertices.length;
    });

    this.getVertex = function(vertexIndex){
        return new accessors.Vertex(vertexIndex, surfaceImpl);
    };

    this.__defineGetter__('vertices', function(){
        return surfaceImpl.vertices;
    });

    // face edges

    this.__defineGetter__('numFaceEdges', function(){
        return surfaceImpl.halfEdges.length;
    });

    this.getFaceEdge = function(faceEdgeIndex){
        return new accessors.FaceEdge(faceEdgeIndex, surfaceImpl);
    };

    this.__defineGetter__('faceEdges', function(){
        return surfaceImpl.halfEdges;
    });

    // faces

    this.__defineGetter__('numFaces', function(){
        return surfaceImpl.faces.length;
    });

    this.getFace = function(faceIndex){
        return new accessors.Face(faceIndex, surfaceImpl);
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
        return new accessors.Edge(edgeIndex, surfaceImpl);
    };

    this.__defineGetter__('edges', function(){
        return getEdges();
    });
}
module.exports = Surface;