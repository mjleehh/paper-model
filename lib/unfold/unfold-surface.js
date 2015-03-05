var _ = require('lodash');


function unfoldSurface(surface, tree){
    var mesh = {
        vertices: [],
        faces: []
    };
    var unfoldSubsurface = function(nodeIndex){
        var node = tree.nodes[nodeIndex];
        var verticesIndices = surface.getFace(nodeIndex).vertices;
        var meshVerticesIndices = _.map(verticesIndices, function(vertexIndex){
            var vertex = surface.getVertex(vertexIndex);
            return mesh.vertices.push({
                x: vertex.x,
                y: vertex.y,
                z: vertex.z
            }) - 1;
        });
        mesh.faces.push({
            vertices: meshVerticesIndices
        });

        _.forEach(node.children, function(childIndex){
            unfoldSubsurface(childIndex, nodeIndex);
        });
    };
    unfoldSubsurface(tree.rootNode);

    return mesh;
}
module.exports = unfoldSurface;