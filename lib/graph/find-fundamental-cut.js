var _ = require('lodash');
var ObjSet = require('../util/obj-set');


function findFundamentalCut(graph, spanningTree, edgeIndex){
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
    _.forEach(graph.edges, function(edge, edgeIndex){
        if (isNodeInSetA[edge[0]] ^ isNodeInSetA[edge[1]]) {
            retval.push(edgeIndex);
        }
    });
    return retval;
}
module.exports = findFundamentalCut;
