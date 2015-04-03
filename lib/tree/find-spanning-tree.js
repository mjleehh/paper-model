var _ = require('lodash');
var ObjSet = require('../util/obj-set');


function findSpanningTree(graph){
    var nodesInTree = new ObjSet();
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
        _.forEach(node.neighbours, function(neighbour){
            var neighbourIndex = neighbour.node;
            if (!nodesInTree.has(neighbourIndex)) {
                var edgeIndex = neighbour.edge;
                treeNode.children.push(edgeIndex);
                buildTree(neighbourIndex);
            }
        });
    };

    if (graph.numNodes < 1) {
        throw new Error('can not find spanning tree for empty set');
    }

    buildTree(0);

    if (nodesInTree.size !== graph.nodes.length) {
        throw new Error('graph has disconnected subgraphs');
    }

    return {
        nodes: treeNodes,
        edges: graph.edges,
        rootNode: 0
    };
}

module.exports = findSpanningTree;
