var _ = require('lodash');


/**
 * Maps the original position of an edge to the new position after sorting.
 */
function EdgeMap(spanningTree){
    var edgeMap = new Array(spanningTree.numEdges);
    var newTreeEdgeIndex = 0;
    var newNonTreeEdgeIndex = spanningTree.numNodes - 1;

    this.addTreeEdge = function(oldEdgeIndex){
        edgeMap[oldEdgeIndex] = newTreeEdgeIndex;
        ++newTreeEdgeIndex;
    };

    this.addNonTreeEdge = function(oldEdgeIndex){
        edgeMap[oldEdgeIndex] = newNonTreeEdgeIndex;
        ++newNonTreeEdgeIndex;
    };

    /**
     * Create a node list with updated edge positions.
     */
    this.updateNodes = function(nodes){
        return _.map(nodes, function(node){
            var children = _.map(node.children, function(edgeIndex){
                return edgeMap[edgeIndex];
            });
            return {
                value: node.value,
                children: children
            };
        });
    };

    /**
     * Create a sorted edge list.
     */
    this.getEdgeList = function(){
        var oldEdgeList = spanningTree.edges;
        var edges = new Array(oldEdgeList.length);
        _.forEach(oldEdgeList, function(edge, edgeIndex){
            edges[edgeMap[edgeIndex]] = edge;
        });
        return edges;
    };
}
module.exports = EdgeMap;