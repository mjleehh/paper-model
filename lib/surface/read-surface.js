var parseVerbLineData = require('../util/parse-verb-line-data');


function readSurface(data){
    var vertices = [];
    var uvs = [];
    var halfEdges = [];
    var faces = [];

    var handlers = {
        'v': function(x, y, z, firstHalfEdge){
            vertices.push({
                x: parseFloat(x),
                y: parseFloat(y),
                z: parseFloat(z),
                firstHalfEdge: parseInt(firstHalfEdge)
            });
        },
        'vt': function(u, v){
            uvs.push({
                u: parseFloat(u),
                v: parseFloat(v)
            });
        },
        'h': function(vertex, nextHalfEdge, face, twin){
            halfEdges.push({
                vertex: parseInt(vertex),
                nextHalfEdge: parseInt(nextHalfEdge),
                face: parseInt(face),
                twin: twin !== undefined ? parseInt(twin) : null
            });
        },
        'f': function(firstHalfEdge){
            faces.push({
                firstHalfEdge: parseInt(firstHalfEdge)
            });
        }
    };

    parseVerbLineData(data, handlers);

    return {
        vertices: vertices,
        halfEdges: halfEdges,
        faces: faces
    };
}

module.exports = readSurface;
