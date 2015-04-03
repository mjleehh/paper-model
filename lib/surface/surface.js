var _ = require('lodash');
var accessors = require('./accessors');

function SurfaceCache(surface){
    my = {};

    var updateEdges = function(){
        var edgesMap = {};
        _.forEach(surface.faceEdges, function(halfEdge, halfEdgeIndex){
            var edge = halfEdge.twin === null ? [halfEdgeIndex] : _.sortBy([halfEdge.twin, halfEdgeIndex]);
            edgesMap[edge] = edge;
        });
        my.edges = _.values(edgesMap);
    };

    this.getEdges = function(){
        if (!my.edges){
            updateEdges();
        }
        return my.edges;
    };
}

// ---------------------------------------------------------------------------------------------------------------------

function Surface(surfaceImpl){
    var data = {
        surfaceImpl: surfaceImpl,
        surfaceCache: new SurfaceCache(this)
    };

    this.__defineGetter__('impl', function(){
        return surfaceImpl;
    });

    // vertices

    this.__defineGetter__('numVertices', function(){
        return surfaceImpl.vertices.length;
    });

    this.getVertex = function(vertexIndex){
        return new accessors.Vertex(vertexIndex, data);
    };

    this.__defineGetter__('vertices', function(){
        return surfaceImpl.vertices;
    });

    // face edges

    this.__defineGetter__('numFaceEdges', function(){
        return surfaceImpl.halfEdges.length;
    });

    this.getFaceEdge = function(faceEdgeIndex){
        return new accessors.FaceEdge(faceEdgeIndex, data);
    };

    this.__defineGetter__('faceEdges', function(){
        return surfaceImpl.halfEdges;
    });

    // faces

    this.__defineGetter__('numFaces', function(){
        return surfaceImpl.faces.length;
    });

    this.getFace = function(faceIndex){
        return new accessors.Face(faceIndex, data);
    };

    this.__defineGetter__('faces', function(){
        return surfaceImpl.faces;
    });

    // edges

    this.__defineGetter__('numEdges', function(){
        return data.surfaceCache.getEdges().length;
    });

    this.getEdge = function(edgeIndex){
        return new accessors.Edge(edgeIndex, data);
    };

    this.__defineGetter__('edges', function(){
        return data.surfaceCache.getEdges();
    });
}
module.exports = Surface;