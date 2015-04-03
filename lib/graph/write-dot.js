var _ = require('lodash');


function writeDot(graphImpl){
    var buffer = 'graph G {\n';
    _.forEach(graphImpl.nodes, function(node, nodeIndex){
        buffer += '    ' + nodeIndex + ' [label="' + nodeIndex + ' \\"' + node + '\\""];\n';
    });
    _.forEach(graphImpl.edges, function(edge, edgeIndex){
        buffer += '    ' + edge[0] + '--' + edge[1] + '[label="' + edgeIndex + '"];\n';
    });
    buffer += '}\n';
    return buffer;
}

module.exports = writeDot;
