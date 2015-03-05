var vecks = require('vecks');
var parseVerbLineData = require('../util/parse-verb-line-data');

function componentsSpecified(componentsString){
    var parts = componentsString.split('/');
    if (parts.length === 1) {
        return {
            uvs: false,
            normals: false
        };
    } else if (parts.length === 2) {
        return {
            uvs: true,
            normals: false
        };
    } else if (parts.length === 3) {
        if (parts[1].length > 0) {
            return {
                uvs: true,
                normals: true
            };
        } else {
            return {
                uvs: false,
                normals: true
            };
        }
    }
    throw new Error('Error invalid face components:' + componentsString);
}

function readObj(data){
    var vertices = [];
    var uvs = [];
    var faces = [];
    var components = null;

    var readObjIndex = function(str){
        return parseInt(str) - 1;
    };

    var handlers = {
        'v': function(x, y, z){
            vertices.push({
                x: parseFloat(x),
                y: parseFloat(y),
                z: parseFloat(z)
            });
        },
        'vt': function(u, v){
            uvs.push(new vecks.Vec2(
                parseFloat(u),
                parseFloat(v)
            ));
        },
        'f': function(){
            var verts = arguments;
            var face = {
                vertices: [],
                normals: null,
                uvs: null
            };

            if (components === null) {
                components = componentsSpecified(verts[0]);
            }

            if (components.uvs) {
                face.uvs = [];
            }

            if (components.normals) {
                face.normals = [];
            }

            for (var j = 0; j < verts.length; ++j) {
                var parts = verts[j].split('/');
                face.vertices.push(readObjIndex(parts[0]));
                if (components.uvs) {
                    face.uvs.push(readObjIndex(parts[1]));
                }
                if (components.normals) {
                    face.normals.push(readObjIndex(parts[2]));
                }
            }
            faces.push(face);
        }
    };

    parseVerbLineData(data, handlers);

    return {
        vertices: vertices,
        faces: faces
    };
}

module.exports = readObj;
