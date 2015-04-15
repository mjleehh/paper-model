var _ = require('lodash');
var treeForEach = require('./tree-for-each');

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

    this.getEdgeIsInTree = function(){
        if (!my.edgeIsInTree) {
            updateEdgeIsInTree();
        }
        return my.edgeIsInTree;
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

function Node(nodeIndex, data){
    var nodeImpl = data.treeImpl.nodes[nodeIndex];

    this.__defineGetter__('id', function(){
        return nodeIndex;
    });

    this.__defineGetter__('value', function(){
       return nodeImpl.value;
    });

    this.__defineGetter__('children', function(){
        return _.map(nodeImpl.children, function(edgeIndex){
            var edge = data.treeImpl.edges[edgeIndex];
            var fst = edge[0];
            var snd = edge[1];
            var childIndex = fst === nodeIndex ? snd : fst;
            return {
                node: childIndex,
                edge: edgeIndex
            };
        });
    });
}

function Tree(treeImpl){
    var data = {
        treeImpl: treeImpl,
        cache: new TreeCache(this)
    };

    this.__defineGetter__('rootNode', function(){
        return new Node(treeImpl.rootNode, data);
    });

    this.__defineGetter__('numNodes', function(){
        return treeImpl.nodes.length;
    });

    this.getNode = function(nodeIndex){
        return new Node(nodeIndex, data);
    };

    this.__defineGetter__('nodes', function(){
        return treeImpl.nodes;
    });

    /** edges present in tree
     *
     * edges are sorted by decendency:
     * for an edge at position i in the list
     * - all ancestor edges are before position i in list
     * - all decendent edges are after position i in list
     */
    this.__defineGetter__('treeEdges', function(){
        return data.cache.getTreeEdges();
    });

    this.__defineGetter__('nonTreeEdges', function(){
        return data.cache.getNonTreeEdges();
    });

    this.__defineGetter__('numEdges', function(){
        return treeImpl.edges.length;
    });

    this.__defineGetter__('edges', function(){
        return treeImpl.edges;
    });
}

module.exports = Tree;
