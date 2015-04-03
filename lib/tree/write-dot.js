var _ = require('lodash');


function writeDot(tree, wholeGraph){
    var buffer = 'digraph G {\n';

    var traverseTree = function(node){
        buffer += '    ' + node.id + ' [label="' + node.id + ' \\"' + node.value + '\\""];\n';
        _.forEach(node.children, function(child){
            var childIndex = child.node;
            buffer += '    ' + node.id + ' -> ' + childIndex + ' [label="' + child.edge + '"];\n';
            traverseTree(tree.getNode(childIndex));
        });
    };
    traverseTree(tree.rootNode);

    if (wholeGraph) {
        buffer += '    subgraph nonTreeEdges {\n        edge[dir=none, color=gray];';
        var edges = tree.edges;
        _.forEach(tree.nonTreeEdges, function(edgeIndex){
            var edge = edges[edgeIndex];
            buffer += '        ' + edge[0] + ' -> ' + edge[1] + ' [label="' + edgeIndex + '", color=gray];\n';
        });
        buffer += '    }\n';
    }

    buffer += '}\n';
    return buffer;
}

module.exports = writeDot;
