var findSortedSpanningTree = require('./find-sorted-spanning-tree');


/** iterate all spanning trees of a graph
 *
 * sketch of the Shioura-Tamura algorithm
 */
function spanningTrees(graph){
    var initialSpanningTree = findSortedSpanningTree(graph);

    var findChildren = function(spanningTree, k){
        if (k === 0) {
            return;
        }

        for (var j = graph.numNodes; j < graph.numEdges; ++j) {
        }
    };
    findChildren(initialSpanningTree, graph.numNodes - 1);
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
