var _ = require('lodash');


function writeDot(graph){
    var buffer = 'graph G {\n';
    _.forEach(graph.nodes, function(node, nodeIndex){
        buffer += '    ' + nodeIndex + ' [label="' + nodeIndex + ' \\"' + node.value + '\\""];\n';
    });
    _.forEach(graph.edges, function(edge, edgeIndex){
        buffer += '    ' + edge[0] + '--' + edge[1] + '[label="' + edgeIndex + '"];\n';
    });
    buffer += '}\n';
    return buffer;
}

module.exports = writeDot;
