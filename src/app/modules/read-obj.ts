import three = require('three');
import meshLib  = require('./mesh-lib');


class ComponentFlags {
    constructor(public uvs: boolean, public normals: boolean) {}
}

function componentsSpecified(componentsString): ComponentFlags {
    var parts = componentsString.split('/');
    if (parts.length === 1) {
        return new ComponentFlags(false, false);
    } else if (parts.length === 2) {
        return new ComponentFlags(true, false);
    } else if (parts.length === 3) {
        if (parts[1].length > 0) {
            return new ComponentFlags(true, true);
        } else {
            return new ComponentFlags(false, true);
        }
    }
    throw new Error('Error invalid face components:' + componentsString);
}

export function readObj(data: string): meshLib.Mesh {
    var vertices = [],
        uvs = [],
        faces = [],
        components: ComponentFlags = null;

    var handlers = {
        'v': (x: string, y: string, z: string) => {
            vertices.push(new three.Vector3(
                parseFloat(x),
                parseFloat(y),
                parseFloat(z)));
        },
        'vt': (u: string, v: string) => {
            uvs.push(new three.Vector2(
                parseFloat(u),
                parseFloat(v)
            ))
        },
        'f': (...verts : string[]) => {
            var face = new meshLib.Face();

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
        words.filter((word) => {
            return word === '' || word === '\r';
        });
        if (words.length > 1) {
            var verb = words[0],
                nouns = words.slice(1);
            if (handlers.hasOwnProperty(verb)) {
                handlers[verb].apply(null, nouns);
            }
        }
    }

    return new meshLib.Mesh(vertices, faces);
}
