var _ = require('lodash');


/**
 * Maps the original position of a tree node to the new position after sorting.
 */
function NodeMap(spanningTree){
    var _this = this;
    var nodeMap = new Array(spanningTree.numNodes);
    var nodeList = [];

    this.addNode = function(node){
        nodeMap[node.id] = nodeList.length;
        var children = _.map(node.children, function(connection){
            return connection.edge;
        });
        nodeList.push({
            value: node.value,
            children: children
        });
    };

    this.updateEdges = function(edges){
        return _.map(edges, function(edge){
            return _this.updateEdge(edge);
        });
    };

     this.updateEdge = function(edge){
         return _.sortBy([
             nodeMap[edge[0]],
             nodeMap[edge[1]]
         ]);
     };

    this.getNodeList = function(){
        return nodeList;
    };

    // private
}
module.exports = NodeMap;
