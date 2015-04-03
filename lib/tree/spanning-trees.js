var _ = require('lodash');
var findSpanningTree = require('./find-spanning-tree');
var ObjSet = require('../util/obj-set');


function findInitialSpanningTree(graph){
    var edgeMap = [];
    var edges = [];
    var treeNodes = [];
    var graphNodes = [];

    var depthFirstTree = findSpanningTree(graph);

    for (var i = 0; i < depthFirstTree.edges; ++i){
        if (depthFirstTree.edgesInTree) {
            edgeMap[i] = edges.push(depthFirstTree.edges[i]) - 1;
        }
    }

    for (var j = 0; j < depthFirstTree.nodes; ++j){
        var treeNode = depthFirstTree.nodes[j];
        treeNodes.push({
            //
        });

        var graphNode = graph.nodes[j];
        graphNodes.push(
            //
        );
    }
}


function entr(T_p, e_j){

}

/** iterate all spanning trees of a graph
 *
 * sketch of the Shioura-Tamura algorithm
 */
function spanningTrees(graph){

    /*
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
    */
}
module.exports = spanningTrees;
