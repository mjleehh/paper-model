var _ = require('lodash');
var Tree = require('../../tree').Tree;
var treeForEach = require('../../tree/for-each');
var findSpanningTree = require('../find-spanning-tree');
var NodeMap = require('./node-map');
var EdgeMap = require('./edge-map');


function findNodeOrder(spanningTree){
    var nodeMap = new NodeMap(spanningTree);
    treeForEach(spanningTree, function(node){
        nodeMap.addNode(node);
    });
    return nodeMap;
}

// --------------------------------------------------------------------------------------

function findTreeEdgeOrder(spanningTree, edgeMap){
    _.forEach(spanningTree.treeEdges, function(treeEdgeIndex){
        edgeMap.addTreeEdge(treeEdgeIndex);
    });
}

// --------------------------------------------------------------------------------------

function findNonTreeEdgeOrder(spanningTree, nodeMap, edgeMap){
    var nonTreeEdgeBuckets = new Array(spanningTree.numNodes);
    var nonTreeEdges = spanningTree.nonTreeEdges;
    var edges = spanningTree.edges;
    _.forEach(nonTreeEdges, function(edgeIndex){
        var edge = nodeMap.updateEdge(edges[edgeIndex]);
        var fst = edge[0];
        if (!nonTreeEdgeBuckets[fst]) {
            nonTreeEdgeBuckets[fst] = [];
        }
        nonTreeEdgeBuckets[fst].push(edgeIndex);
    });

    _.forEach(nonTreeEdgeBuckets, function(bucket){
        _.forEach(bucket, function(edgeIndex){
            edgeMap.addNonTreeEdge(edgeIndex);
        });
    });
}

// --------------------------------------------------------------------------------------

/** reorder edges and nodes in graph to match the preconditions of the Shioura-Tamura algorithm
 *
 * 1) the spanning tree is depth first
 * 2) the node list is sorted such that:
 *    for a node at position i
 *      - all ancestor nodes are before position i in the list
 *      - all decendent nodes are after position i in the list
 * 3) all edges are sorted such that
 *    a) the edge list is divided into two sublist such that the edges in the tree a prior to
 *       edges not in the tree
 *    b) the sublist of edges in the tree is sorted such that
 *       for an edge at position i
 *        - all ancestor edges are before position i in the list
 *        - all decendent edges are after position i in the list
 *    c) the sublist of edges not in the tree is sorted by tail
 *
 * @param {Graph} graph
 */
function sortSpanningTree(graph){
    // criterion 1
    // find a depth first spanning tree

    var spanningTree = new Tree(findSpanningTree(graph));

    var nodeMap = findNodeOrder(spanningTree);
    var nodes = nodeMap.getNodeList();

    var edgeMap = new EdgeMap(spanningTree);
    findTreeEdgeOrder(spanningTree, edgeMap);
    findNonTreeEdgeOrder(spanningTree, nodeMap, edgeMap);

    var edges = edgeMap.getEdgeList();
    var updatedEdges = nodeMap.updateEdges(edges);
    var updatedNodes = edgeMap.updateNodes(nodes);

    // criterion 3c

    return new Tree({
        nodes: updatedNodes,
        edges: updatedEdges,
        rootNode: 0
    });
}

module.exports = sortSpanningTree;
