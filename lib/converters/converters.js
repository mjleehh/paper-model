var _ = require('lodash');
var sets = require('simplesets');


exports.findSpanningTree = function(graph){
    var nodesInTree = new sets.Set();

    var buildTree = function(node){
        nodesInTree.add(node);
        var result = {
            value: node.value,
            children: []
        };
        _.forEach(node.neighbours, function(neighbour){
            if (!nodesInTree.has(neighbour)) {
                result.children.push(buildTree(neighbour));
            }
        });
        return result;
    };

    if (graph.nodes.length < 1) {
        throw new Error('can not find spanning tree for empty set');
    }
    return buildTree(_.first(graph.nodes));
};
