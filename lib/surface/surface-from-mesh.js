var _ = require('lodash');


function EdgeMap(){
    var map = {};
    var generateKey = function(vertex1Index, vertex2Index){
        return _.sortBy([vertex1Index, vertex2Index]).toString();
    };

    this.add = function(vertex1Index, vertex2Index, halfEdgeIndex){
        var key = generateKey(vertex1Index, vertex2Index);
        var mapping = map[key];
        if (mapping === undefined) {
            map[key] = {
                fst: halfEdgeIndex,
                snd: null
            };
        } else {
            if (mapping.snd !== null) {
                throw Error('non manifold edge encountered');
            }
            mapping.snd = halfEdgeIndex;
        }
    };

    this.pairs = function(){
        return _.filter(map, function(elem){
            return elem.snd !== null;
        });
    };
}

function createIndexNormalizer(length, offset){
    if (offset === undefined) {
        offset = 0;
    }
    return function(index){
        var relativeBidirectional = index % length;
        var relativePositive = index < 0 ? length + relativeBidirectional : relativeBidirectional;
        return offset + relativePositive;
    };
}

function buildSurface(){
    var vertices = [];
    var halfEdges = [];
    var faces = [];

    var edgeMap = new EdgeMap();

    var addVertex = function(x, y, z){
        var len = vertices.push({
            x: x,
            y: y,
            z: z,
            firstHalfEdge: null
        });
        return len - 1;
    };

    var addHalfEdgeCycle = function(vertexIndices, faceIndex){
        var normalizeFaceVertexIndex = createIndexNormalizer(vertexIndices.length);
        var normalizeFaceEdgeIndex = createIndexNormalizer(vertexIndices.length, halfEdges.length);

        for (var i = 0; i < vertexIndices.length; ++i) {
            edgeMap.add(
                vertexIndices[normalizeFaceVertexIndex(i - 1)],
                vertexIndices[i],
                normalizeFaceEdgeIndex(i)
            );
            addHalfEdge(
                vertexIndices[i],
                faceIndex,
                normalizeFaceEdgeIndex(i + 1),
                normalizeFaceEdgeIndex(i - 1)
            );
        }

        return normalizeFaceEdgeIndex(0);
    };

    var addHalfEdge = function(vertexIndex, faceIndex, nextHalfEdgeIndex, prevHalfEdgeIndex){
        var len = halfEdges.push({
            vertex: vertexIndex,
            face: faceIndex,
            nextHalfEdge: nextHalfEdgeIndex,
            prevHalfEdge: prevHalfEdgeIndex,
            twin: null
        });

        // assign this half edge to vertex if the vertex does not yet have a half edge assigned
        var halfEdgeIndex =  len - 1;
        var vertex = vertices[vertexIndex];
        if (vertex.firstHalfEdge === null) {
            vertex.firstHalfEdge = halfEdgeIndex;
        }
        return halfEdgeIndex;
    };

    var addFace = function(vertexIndices){
        var len = faces.push({
            firstHalfEdge: addHalfEdgeCycle(vertexIndices, faces.length)
        });
        return len - 1;
    };

    // exposed

    var build = function(){
        return {
            vertices: vertices,
            halfEdges: halfEdges,
            faces: faces
        };
    };

    var connectTwinEdges = function(){
        _.forEach(edgeMap.pairs(), function(pair){
            halfEdges[pair.fst].twin = pair.snd;
            halfEdges[pair.snd].twin = pair.fst;
        });

        return {
            build: build
        };
    };

    var addFaces = function(faces){
        _.forEach(faces, function(face){
            addFace(face.vertices);
        });
        return {
            connectTwinEdges: connectTwinEdges
        };
    };

    var addVertices = function(vertices){
        _.forEach(vertices, function(vertex){
            addVertex(vertex.x, vertex.y, vertex.z);
        });
        return {
            addFaces: addFaces
        };
    };

    return {
        addVertices: addVertices
    };
}

function surfaceFromMesh(mesh){
    return buildSurface()
        .addVertices(mesh.vertices)
        .addFaces(mesh.faces)
        .connectTwinEdges()
        .build();
}

module.exports = surfaceFromMesh;
