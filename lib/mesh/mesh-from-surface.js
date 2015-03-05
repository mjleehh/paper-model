var _ = require('lodash');


function meshFromSurface(surface){
    return {
        vertices: _.map(surface.vertices, function(vertex){
            return {
                x: vertex.x,
                y: vertex.y,
                z: vertex.z
            };
        }),
        faces: _.map(surface.faces, function(___1, faceIndex){
            return {
                vertices: surface.getFace(faceIndex).vertices
            };
        })
    };
}
module.exports = meshFromSurface;