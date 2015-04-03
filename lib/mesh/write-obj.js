var _ = require('lodash');

function writeObjIndex(index){
    return index + 1;
}

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
        faceLine += writeObjIndex(face.vertices[i]);
        if (face.uvs || face.normals) {
            faceLine += '/';
        }
        if (face.uvs) {
            faceLine += writeObjIndex(face.uvs[i]);
        }
        if (face.normals) {
            faceLine += '/' + writeObjIndex(face.normals[i]);
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

function writeObj(meshImpl){
    var buffer = '';

    buffer += writeVertices(meshImpl.vertices);
    buffer += writeFaces(meshImpl.faces);

    return buffer;
}

module.exports = writeObj;
