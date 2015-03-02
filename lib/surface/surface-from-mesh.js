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
            map[key] = [halfEdgeIndex];
        } else {
            if (mapping.length > 1) {
                throw Error('non manifold edge encountered');
            }
            mapping.push(halfEdgeIndex);
        }
    };

    this.get = function(vertex1Index, vertex2Index){
        var key = generateKey(vertex1Index, vertex2Index);
        if (!_.has(map, key)) {
            return null;
        }
        return map[key];
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
            z: z
        });
        return len - 1;
    };

    var addHalfEdgeCycle = function(vertexIndices, faceIndex){
        var reversedVertices = _(vertexIndices).reverse().value();
        var vertexIndex = _.first(reversedVertices);
        var nextHalfEdgeIndex = halfEdges.length + vertexIndices.length - 1;

        _.forEach(_.rest(reversedVertices), function(prevVertexIndex){
            edgeMap.add(prevVertexIndex, vertexIndex, nextHalfEdgeIndex);
            nextHalfEdgeIndex = addHalfEdge(vertexIndex, faceIndex, nextHalfEdgeIndex);
            vertexIndex = prevVertexIndex;
        });

        edgeMap.add(_.first(reversedVertices), vertexIndex, nextHalfEdgeIndex);
        nextHalfEdgeIndex = addHalfEdge(vertexIndex, faceIndex, nextHalfEdgeIndex);

        return nextHalfEdgeIndex;
    };

    var addHalfEdge = function(vertexIndex, faceIndex, nextHalfEdgeIndex){
        var len = halfEdges.push({
            nextVertex: vertexIndex,
            face: faceIndex,
            nextHalfEdge: nextHalfEdgeIndex
        });
        return len - 1;
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

    var addFaces = function(faces){
        _.forEach(faces, function(face){
            addFace(face.vertices);
        });
        return {
            build: build
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
        .build();
}

module.exports = surfaceFromMesh;
