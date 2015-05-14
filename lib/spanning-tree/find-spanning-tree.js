var _ = require('lodash');


/**
 * Get a depth first spanning tree with the first graph node as root.
 *
 * @param {Graph} graph
 */
function findSpanningTree(graph){
    var nodesInTree = new Array(graph.numNodes);
    var treeNodes = _.map(graph.nodes, function(node){
        return {
            value: node,
            children: []
        };
    });

    var buildTree = function(nodeIndex){
        nodesInTree[nodeIndex] = true;
        var treeNode = treeNodes[nodeIndex];
        var node = graph.getNode(nodeIndex);
        _.forEach(node.neighbours, function(neighbour){
            var neighbourIndex = neighbour.node;
            if (!nodesInTree[neighbourIndex]) {
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

    if (nodesInTree.length !== graph.numNodes) {
        throw new Error('graph has disconnected subgraphs');
    }

    return {
        nodes: treeNodes,
        edges: graph.edges,
        rootNode: 0
    };
}

module.exports = findSpanningTree;
