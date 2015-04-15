var _ = require('lodash');
var treeForEach = require('../tree/for-each');


/**1
 * C*(T, f) :
 */
function findFundamentalCut(spanningTree, edgeIndex){
    var isNodeInSetA = new Array(spanningTree.numNodes);

    treeForEach(spanningTree, function(node, _, parentEdgeIndex){
        if (parentEdgeIndex === edgeIndex) {
            treeForEach.stopSubtree();
        }
        isNodeInSetA[node.id] = true;
    });

    var retval = [];
    _.forEach(spanningTree.edges, function(edge, edgeIndex){
        if (isNodeInSetA[edge[0]] ^ isNodeInSetA[edge[1]]) {
            retval.push(edgeIndex);
        }
    });
    return retval;
}
module.exports = findFundamentalCut;
