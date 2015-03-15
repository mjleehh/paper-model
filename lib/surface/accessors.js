var _ = require('lodash');
var surfaceIters = require('./surface-iters');
var Vec3 = require('vecks').Vec3;

var FaceEdge;

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
exports.Vertex = Vertex;

// ---------------------------------------------------------------------------------------------------------------------

function Face(faceIndex, surfaceImpl){
    var faceImpl = surfaceImpl.faces[faceIndex];

    var forEdges = function(handler){
        surfaceIters.forEach(surfaceIters.faceEdgeCycle(faceImpl.firstHalfEdge, surfaceImpl), handler);
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

    this.__defineGetter__('normal', function(){
        var faceEdge = new FaceEdge(faceImpl.firstHalfEdge, surfaceImpl);
        var fst = faceEdge.prevFaceEdge.vertex;
        var snd = faceEdge.vertex;
        var trd = faceEdge.nextFaceEdge.vertex;
        var v1 = new Vec3(snd).sub(new Vec3(fst));
        var v2 = new Vec3(trd).sub(new Vec3(snd));
        return v1.cross(v2);
    });
}
exports.Face = Face;

// ---------------------------------------------------------------------------------------------------------------------

FaceEdge = function(faceEdgeIndex, surfaceImpl){
    var faceEdgeImpl = surfaceImpl.halfEdges[faceEdgeIndex];

    this.__defineGetter__('id', function(){
        return faceEdgeIndex;
    });

    this.__defineGetter__('neighbour', function(){
        var twinIndex = faceEdgeImpl.twin;
        return twinIndex === null ? null : new Face(surfaceImpl.halfEdges[twinIndex].face, surfaceImpl);
    });

    this.__defineGetter__('twin', function(){
        var twinIndex = faceEdgeImpl.twin;
        return faceEdgeImpl.twin === null ? null : new FaceEdge(twinIndex, surfaceImpl);
    });

    this.__defineGetter__('prevFaceEdge', function(){
        return new FaceEdge(faceEdgeImpl.prevHalfEdge, surfaceImpl);
    });

    this.__defineGetter__('nextFaceEdge', function(){
        return new FaceEdge(faceEdgeImpl.nextHalfEdge, surfaceImpl);
    });

    this.__defineGetter__('begin', function(){
        var vertexIndex = surfaceImpl.halfEdges[faceEdgeImpl.prevHalfEdge].vertex;
        return new Vertex(vertexIndex, surfaceImpl);
    });

    this.__defineGetter__('end', function(){
        return new Vertex(faceEdgeImpl.vertex, surfaceImpl);
    });

    this.__defineGetter__('face', function(){
        return new Face(faceEdgeImpl.face, surfaceImpl);
    });

    this.__defineGetter__('vertex', function(){
        return new Vertex(faceEdgeImpl.vertex, surfaceImpl);
    });
};
exports.FaceEdge = FaceEdge;

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
exports.Edge = Edge;
