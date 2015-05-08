var _ = require('lodash');
var Tree = require('../tree').Tree;
var findSpanningTree = require('./find-spanning-tree');

/** reorder edges and nodes in graph to match the preconditions of the Shioura-Tamura algorithm
 *
 * 1) the spanning tree is depth first
 * 2) the node list is sorted such that:
 *    for a node at position i
 *      - all ancestor nodes are before position i in the list
 *      - all decendent nodes are after position i in the list
 * 3) all edges are sorted such that
 *    a) the edge list is devided into two sublist such that the edges in the tree a prior to
 *       edges not in the tree
 *    b) the sublist of edges in the tree is sorted such that
 *       for an edge at position i
 *        - all ancestor edges are before position i in the list
 *        - all decendent edges are after position i in the list
 *    c) the sublist of edges not in the tree is sorted by tail
 *
 */
function sortSpanningTree(graph){
    // find a depth first spanning tree

    var spanningTree = new Tree(findSpanningTree(graph));

    // get separate sets for edges in tree and edges not in tree

    var treeEdges = _.map(spanningTree.treeEdges, function(edgeIndex){
        return spanningTree.edges[edgeIndex];
    });
    var nonTreeEdges = _.map(spanningTree.nonTreeEdges, function(edgeIndex){
        return spanningTree.edges[edgeIndex];
    });

    // find an ordering for nodes

    var nodeMap = new Array(spanningTree.numNodes);
    var newNodeIndex = 0;
    var findChildNodes = function(node){
        nodeMap[node.id] = newNodeIndex;
        newNodeIndex++;
        _.forEach(node.children, function(child){
            findChildNodes(spanningTree.getNode(child.node));
        });
    };
    findChildNodes(spanningTree.rootNode);

    var nodes = _.map(nodeMap, function(_, nodeIndex){
        return spanningTree.nodes[nodeMap[nodeIndex]];
    });

    treeEdges = _.map(treeEdges, function(edge){
        return _.sortBy([
            nodeMap[edge[0]],
            nodeMap[edge[1]]
        ]);
    });
    nonTreeEdges = _.map(nonTreeEdges, function(edge){
        return _.sortBy([
            nodeMap[edge[0]],
            nodeMap[edge[1]]
        ]);
    });

    var nonTreeEdgeBuckets = new Array(spanningTree.numNodes);
    _.forEach(nonTreeEdges, function(edge){
        var fst = edge[0];
        if (!nonTreeEdgeBuckets[fst]) {
            nonTreeEdgeBuckets[fst] = [];
        }
        nonTreeEdgeBuckets[fst].push(edge);
    });

    nonTreeEdges = [];
    _.forEach(nonTreeEdgeBuckets, function(bucket){
        _.forEach(bucket, function(edge){
            nonTreeEdges.push(edge);
        });
    });

    return new Tree({
        nodes: nodes,
        edges: treeEdges.concat(nonTreeEdges),
        rootNode: 0
    });
}

module.exports = sortSpanningTree;
