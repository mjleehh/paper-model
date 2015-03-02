var _ = require('lodash');


function writeVertices(vertices){
    var buffer = '';
    _.forEach(vertices, function(vertex){
        buffer += 'v ' + vertex.x + ' ' + vertex.y + ' ' + vertex.z + '\n';
    });
    return buffer;
}

function writeFace(face){
    var faceLine = 'f';
    for (var i = 0; i < face.vertices.length; ++i){
        faceLine += ' ';
        faceLine += face.vertices[i];
        if (face.uvs || face.normals) {
            faceLine += '/';
        }
        if (face.uvs) {
            faceLine += face.uvs[i];
        }
        if (face.normals) {
            faceLine += '/' + face.normals[i];
        }
    }
    return faceLine + '\n';
}

function writeFaces(faces){
    var buffer = '';
    _.forEach(faces, function(face){
        buffer += writeFace(face);
    });
    return buffer;
}

function writeObj(mesh){
    var buffer = '';

    buffer += writeVertices(mesh.vertices);
    buffer += writeFaces(mesh.faces);

    return buffer;
}

module.exports = writeObj;
