var _ = require('lodash');
var Vec2 = require('vecks').Vec2;
var util = require('./util');

function intervalsOverlap(interval1, interval2){
    return interval1.min < interval2.max - util.NUMERICAL_TOLERANCE &&
        interval2.min < interval1.max - util.NUMERICAL_TOLERANCE;
}

// ---------------------------------------------------------------------------------------------------------------------

function projectFaceOntoLine(edgeVertices, faceVertices){
    var line = new Vec2(edgeVertices[1]).sub(new Vec2(edgeVertices[0])).normalize();
    var perpendicularLine = new Vec2(line.y, -line.x);
    var project = function(vertex){
        return perpendicularLine.dot(new Vec2(vertex));
    };

    var projected = project(_.first(faceVertices));
    var min = projected;
    var max = projected;

    _.forEach(_.rest(faceVertices), function(vertex){
        projected = project(vertex);
        min = Math.min(min, projected);
        max = Math.max(max, projected);
    });

    return {
        min: min,
        max: max
    };
}
exports.projectFaceOntoLine = projectFaceOntoLine;

// ---------------------------------------------------------------------------------------------------------------------

function projectionOfFacesHasGap(edgeFaceVertices, otherFaceVertices){
    var edgeBegin = _.last(edgeFaceVertices);
    return _.some(edgeFaceVertices, function(edgeEnd){
        var edge = [edgeEnd, edgeBegin];
        var face1Projection = projectFaceOntoLine(edge, edgeFaceVertices);
        var face2Projection = projectFaceOntoLine(edge, otherFaceVertices);
        edgeBegin = edgeEnd;
        return !intervalsOverlap(face1Projection, face2Projection);
    });
}

// ---------------------------------------------------------------------------------------------------------------------

function doFacesIntersect(face1Vertices, face2Vertices){
    var facesHaveGap = projectionOfFacesHasGap(face1Vertices, face2Vertices) ||
        projectionOfFacesHasGap(face2Vertices, face1Vertices);
    return !facesHaveGap;
}
exports.doFacesIntersect = doFacesIntersect;
