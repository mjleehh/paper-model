var _ = require('lodash');
var findSpanningTree = require('./find-spanning-tree');
var ObjSet = require('../util/obj-set');

function treeEdges(tree){
    var retval = [];
    var subtreeEdges = function(nodeIndex){
        var node = tree.nodes[nodeIndex];
        _.forEach(node.children, function(childIndex){
            retval.push(_.sortBy([nodeIndex, childIndex]));
            subtreeEdges(childIndex);
        });
    };
    subtreeEdges(tree.rootNode);
    return retval;
}

function edgesDifference(lhs, rhs){
    var edgeString = function(edge){
        return edge[0] + '|' + edge[1];
    };
    var rhsSet = new ObjSet(rhs, edgeString);

    return _.filter(lhs, function(edge){
        return !rhsSet.has(edge);
    });
}

function isSpanningTree(){
    return true;
}

/** iterate all spanning trees of a graph
 *
 * sketch of the Shioura-Tamura algorithm
 */
function spanningTrees(graph){
    var t0 = findSpanningTree(graph);
    var E = treeEdges(t0);
    var G = edgesDifference(graph.edges, E);

    var _graph = {
        nodes: graph.nodes,
        edges: _.clone(E)
    };

    var getRemainingSpanningTrees = function(k){
        if (k === 0){
            // yield end
        } else {
            _.forEach(G, function(g){
                _graph.edges[k] = g;
                if (isSpanningTree(_graph)) {
                    // yield graph
                    getRemainingSpanningTrees(k - 1);
                }
                _graph.edges[k] = E[k];
            });
            getRemainingSpanningTrees(k - 1);
        }
    };
    getRemainingSpanningTrees(E.length - 1);
}
module.exports = spanningTrees;