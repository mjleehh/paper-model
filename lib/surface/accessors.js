var _ = require('lodash');
var surfaceIters = require('./surface-iters');
var Vec3 = require('vecks').Vec3;

var FaceEdge;

function Vertex(vertexIndex, data){
    var vertexImpl = data.surfaceImpl.vertices[vertexIndex];

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

function Face(faceIndex, data){
    var faceImpl = data.surfaceImpl.faces[faceIndex];

    var forEdges = function(handler){
        surfaceIters.forEach(surfaceIters.faceEdgeCycle(faceImpl.firstHalfEdge, data.surfaceImpl), handler);
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
            retval.push(data.surfaceImpl.halfEdges[edgeIndex].vertex);
        });
        return retval;
    });

    this.__defineGetter__('connectedFaces', function(){
        var retval = [];
        forEdges(function(edgeIndex){
            var twinIndex = data.surfaceImpl.halfEdges[edgeIndex].twin;
            if (twinIndex !== null) {
                retval.push(data.surfaceImpl.halfEdges[twinIndex].face);
            }
        });
        return retval;
    });

    this.__defineGetter__('normal', function(){
        var faceEdge = new FaceEdge(faceImpl.firstHalfEdge, data);
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

function FaceEdge(faceEdgeIndex, data){
    var faceEdgeImpl = data.surfaceImpl.halfEdges[faceEdgeIndex];

    this.__defineGetter__('id', function(){
        return faceEdgeIndex;
    });

    this.__defineGetter__('neighbour', function(){
        var twinIndex = faceEdgeImpl.twin;
        return twinIndex === null ? null : new Face(data.surfaceImpl.halfEdges[twinIndex].face, data);
    });

    this.__defineGetter__('twin', function(){
        var twinIndex = faceEdgeImpl.twin;
        return faceEdgeImpl.twin === null ? null : new FaceEdge(twinIndex, data);
    });

    this.__defineGetter__('prevFaceEdge', function(){
        return new FaceEdge(faceEdgeImpl.prevHalfEdge, data);
    });

    this.__defineGetter__('nextFaceEdge', function(){
        return new FaceEdge(faceEdgeImpl.nextHalfEdge, data);
    });

    this.__defineGetter__('begin', function(){
        var vertexIndex = data.surfaceImpl.halfEdges[faceEdgeImpl.prevHalfEdge].vertex;
        return new Vertex(vertexIndex, data);
    });

    this.__defineGetter__('end', function(){
        return new Vertex(faceEdgeImpl.vertex, data);
    });

    this.__defineGetter__('face', function(){
        return new Face(faceEdgeImpl.face, data);
    });

    this.__defineGetter__('vertex', function(){
        return new Vertex(faceEdgeImpl.vertex, data);
    });
};
exports.FaceEdge = FaceEdge;

// ---------------------------------------------------------------------------------------------------------------------

function Edge(edgeIndex, data){
    var edgeImpl = data.surfaceCache.getEdges()[edgeIndex];

    this.__defineGetter__('id', function(){
        return edgeIndex;
    });

    this.__defineGetter__('isBorder', function(){
        return edgeImpl.length === 1;
    });

    this.__defineGetter__('faces', function(){
        return _.map(edgeImpl, function(halfEdgeIndex){
            return data.surfaceImpl.halfEdges[halfEdgeIndex].face;
        });
    });
}
exports.Edge = Edge;
