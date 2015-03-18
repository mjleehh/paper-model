var _ = require('lodash');
var Vec2 = require('vecks').Vec2;


function doFacesIntersect(face1, face2, surface){
    function projectFace(edge, verticesIndices){
        var line = new Vec2(edge.end).sub(new Vec2(edge.begin));
        var project = function(vertexIndex){
            return line.dot(new Vec2(surface.getVertex(vertexIndex)));
        };

        var projected = project(_.first(verticesIndices));
        var min = projected;
        var max = projected;

        _.forEach(_.rest(verticesIndices), function(vertexIndex){
            projected = project(vertexIndex);
            min = _.min(min, projected);
            max = _.max(max, projected);
        });

        return {
            min: min,
            max: max
        };
    }

    return !_.some(face1.edges, function(edgeIndex){
        var edge = surface.getFaceEdge(edgeIndex);
        var face1Projection = projectFace(edge, face1.vertices);
        var face2Projection = projectFace(edge, face2.vertices);
        return face1Projection.end <= face2Projection.begin || face2Projection.end <= face1Projection.begin;
    });
}
module.exports = doFacesIntersect;