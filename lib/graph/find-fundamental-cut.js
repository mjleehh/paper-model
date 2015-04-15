var _ = require('lodash');
var treeForEach = require('../tree').treeForEach;


/**
 * C*(T, f) :
 */
function findFundamentalCut(spanningTree, edgeIndex){
    var isNodeInSetA = new Array(spanningTree.numNodes);

    var addANodes = function(treeNode){
        isNodeInSetA[treeNode.id] = true;
        _.forEach(treeNode.children, function(child){
            if (child.edge !== edgeIndex) {
                addANodes(spanningTree.getNode(child.node));
            }
        });
    };
    addANodes(spanningTree.rootNode);

    var retval = [];
    _.forEach(spanningTree.edges, function(edge, edgeIndex){
        if (isNodeInSetA[edge[0]] ^ isNodeInSetA[edge[1]]) {
            retval.push(edgeIndex);
        }
    });
    return retval;
}
module.exports = findFundamentalCut;
