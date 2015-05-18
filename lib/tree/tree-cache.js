var _ = require('lodash');
var treeForEach = require('./for-each');


function TreeCache(tree){
    var _this = this;
    var my = {};

    var updateTreeEdges = function(){
        var edgeIsInTree = new Array(tree.numEdges);
        var treeEdges = [];
        treeForEach(tree, function(node, _, edgeIndex){
            if (edgeIndex !== null) {
                edgeIsInTree[edgeIndex] = true;
                treeEdges.push(edgeIndex);
            }
        });
        my.edgeIsInTree = edgeIsInTree;
        my.treeEdges = treeEdges;
    };

    var updateNonTreeEdges = function(){
        var nonTreeEdges = [];

        _.forEach(my.edgeIsInTree, function(edgeIsInTree, edgeIndex){
            if (!edgeIsInTree) {
                nonTreeEdges.push(edgeIndex);
            }
        });
        my.nonTreeEdges = nonTreeEdges;
    };

    var updateEdges = function(){
        updateTreeEdges();
        updateNonTreeEdges();
    };

    // public

    /**
     * Get the edges that are part of the tree in depth first order.
     */
    this.getTreeEdges = function(){
        if (!my.treeEdges) {
            updateEdges();
        }
        return my.treeEdges;
    };

    this.getNonTreeEdges = function(){
        if (!my.nonTreeEdges) {
            updateEdges();
        }
        return my.nonTreeEdges;
    };
}
module.exports = TreeCache;