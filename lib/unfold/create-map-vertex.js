var Vec3 = require('vecks').Vec3;


function createMapVertex(faceEdge, mappedBegin, mappedEnd){
    var inOffset = new Vec3(faceEdge.begin);
    var e1 = (new Vec3(faceEdge.end).sub(inOffset)).normalize();
    var e2 = e1.cross(new Vec3(faceEdge.face.normal));

    var outOffset = new Vec3(mappedBegin);
    var eU = (new Vec3(mappedEnd).sub(outOffset)).normalize();
    var eV = eU.cross(new Vec3(0, 0, 1));

    return function(vertex){
        var vec = new Vec3(vertex);
        var u = (vec.sub(inOffset)).dot(e1);
        var v = (vec.sub(inOffset)).dot(e2);
        var retval = (eU.multiply(u)).add((eV.multiply(v))).add(outOffset);
        return {
            x: retval.x,
            y: retval.y,
            z: retval.z
        };
    };
}
module.exports = createMapVertex;