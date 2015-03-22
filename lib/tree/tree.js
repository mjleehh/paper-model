var _ = require('lodash');


function Node(nodeIndex, treeImpl){
    var nodeImpl = treeImpl.nodes[nodeIndex];

    this.__defineGetter__('id', function(){
        return nodeIndex;
    });

    this.__defineGetter__('children', function(){
        return _.map(nodeImpl.children, function(edgeIndex){
            var edge = treeImpl.edges[edgeIndex];
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
    this.__defineGetter__('rootNode', function(){
        return new Node(treeImpl.rootNode, treeImpl);
    });

    this.__defineGetter__('numNodes', function(){
        return treeImpl.nodes.length;
    });

    this.getNode = function(nodeIndex){
        return new Node(nodeIndex, treeImpl);
    };
}

module.exports = Tree;