var _ = require('lodash');


function Node(nodeIndex, graphImpl){
    var getNodeImpl = function(){
        return graphImpl.nodes[nodeIndex];
    };

    var getOther = function(edgeIndex){
        var edge = graphImpl.edges[edgeIndex];
        var fst = edge[0];
        var snd = edge[1];
        return fst === nodeIndex ? snd : fst;
    };

    this.__defineGetter__('value', function(){
        return getNodeImpl().value;
    });

    this.__defineGetter__('neighbours', function(){
        return _.map(getNodeImpl().edges, getOther);
    });
}

function Graph(graphImpl){
    // nodes

    this.__defineGetter__('numNodes', function(){
        return graphImpl.nodes.length;
    });

    this.getNode = function(nodeIndex){
        return new Node(nodeIndex, graphImpl);
    };

    this.__defineGetter__('nodes', function(){
        return graphImpl.nodes;
    });

    // edges

    this.__defineGetter__('edges', function(){
        return graphImpl.edges;
    });
}

module.exports = Graph;
