var _ = require('lodash');
var doFacesIntersect = require('./face-intersection').doFacesIntersect;


function flatMeshIntersects(mesh){
    var numFaces = mesh.faces.length;
    for (var i = 0; i < numFaces; ++i) {
        var firstFace = _.map(mesh.faces[i].vertices, function(vertexIndex){
            return mesh.vertices[vertexIndex];
        });
        for (var j = i + 1; j < numFaces; ++j) {
            var secondFace = _.map(mesh.faces[j].vertices, function(vertexIndex){
                return mesh.vertices[vertexIndex];
            });

            if (doFacesIntersect(firstFace, secondFace)) {
                return true;
            }
        }
    }
    return false;
}
exports.flatMeshIntersects = flatMeshIntersects;
