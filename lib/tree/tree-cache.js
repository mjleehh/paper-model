var treeForEach = require('./for-each');


function TreeCache(tree){
    var _this = this;
    var my = {};

    var updateEdgeIsInTree = function(){
        var edgeIsInTree = new Array(tree.numEdges);
        treeForEach(tree, function(_, __, edgeIndex){
            edgeIsInTree[edgeIndex] = true;
        });
        my.edgeIsInTree = edgeIsInTree;
    };

    var updateEdges = function(){
        var edgeIsInTree = _this.getEdgeIsInTree();

        var treeEdges = [];
        var nonTreeEdges = [];

        for (var i = 0; i < tree.edges.length; ++i){
            if (edgeIsInTree[i]) {
                treeEdges.push(i);
            } else {
                nonTreeEdges.push(i);
            }
        }
        my.treeEdges = treeEdges;
        my.nonTreeEdges = nonTreeEdges;
    };

    // public

    this.getEdgeIsInTree = function(){
        if (!my.edgeIsInTree) {
            updateEdgeIsInTree();
        }
        return my.edgeIsInTree;
    };

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