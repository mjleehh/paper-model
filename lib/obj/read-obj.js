var vecks = require('vecks');


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

module.exports = function(data){
    var vertices = [];
    var uvs = [];
    var faces = [];
    var components = null;

    var handlers = {
        'v': function(x, y, z){
            vertices.push(new vecks.Vec3(
                parseFloat(x),
                parseFloat(y),
                parseFloat(z)
            ));
        },
        'vt': function(u, v){
            uvs.push(new vecks.Vec2(
                parseFloat(u),
                parseFloat(v)
            ));
        },
        'f': function(verts){
            var face = {
                vertices: [],
                normals: [],
                uvs: []
            };

            if (components === null) {
                components = componentsSpecified(verts[0]);
            }

            for (var j = 0; j < verts.length; ++j) {
                var parts = verts[j].split('/');
                face.vertices.push(parseInt(parts[0]));
                if (components.uvs) {
                    face.uvs.push(parseInt(parts[1]));
                }
                if (components.normals) {
                    face.normals.push(parseInt(parts[2]));
                }
            }
            faces.push(face);
        }
    };

    var lines = data.split('\n');
    for (var i = 0; i < lines.length; ++i) {
        var words = lines[i].split(' ');
        words.filter(function(word){
            return word === '' || word === '\r';
        });
        if (words.length > 1) {
            var verb = words[0];
            var nouns = words.slice(1);
            if (handlers.hasOwnProperty(verb)) {
                handlers[verb].apply(null, nouns);
            }
        }
    }

    return {
        vertices: vertices,
        face: faces
    };
};
