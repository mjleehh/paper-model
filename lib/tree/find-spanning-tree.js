var _ = require('lodash');
var sets = require('simplesets');


function findSpanningTree(graph){
    var nodesInTree = new sets.Set();
    var treeNodes = _.map(graph.nodes, function(node){
        return {
            value: node.value,
            children: []
        };
    });

    var buildTree = function(nodeIndex){
        nodesInTree.add(nodeIndex);
        var treeNode = treeNodes[nodeIndex];
        var node = graph.getNode(nodeIndex);
        _.forEach(node.neighbours, function(neighbourIndex){
            if (!nodesInTree.has(neighbourIndex)) {
                treeNode.children.push(neighbourIndex);
                buildTree(neighbourIndex);
            }
        });
    };

    if (graph.numNodes < 1) {
        throw new Error('can not find spanning tree for empty set');
    }

    buildTree(0);

    if (nodesInTree.size() !== graph.nodes.length) {
        throw new Error('graph has disconnected subgraphs');
    }

    return {
        nodes: treeNodes,
        rootNode: 0
    };
}

module.exports = findSpanningTree;