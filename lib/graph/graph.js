var _ = require('lodash');


function GraphCache(graph){
    var my = {};

    var updateNeighbours = function(){
        var neighbours = _.map(graph.nodes, function(){
            return [];
        });

        _.forEach(graph.edges, function(edge, edgeIndex){
            neighbours[edge[0]].push(edgeIndex);
            neighbours[edge[1]].push(edgeIndex);
        });
        my.neighbours = neighbours;
    };

    this.getNeighbours = function(){
        if (!my.neighbours){
            updateNeighbours();
        }
        return my.neighbours;
    };
}

function Node(nodeIndex, data){
    var nodeImpl = data.graphImpl.nodes[nodeIndex];

    var getOther = function(edgeIndex){
        var edge = data.graphImpl.edges[edgeIndex];
        var fst = edge[0];
        var snd = edge[1];
        return fst === nodeIndex ? snd : fst;
    };

    this.__defineGetter__('value', function(){
        return nodeImpl;
    });

    this.__defineGetter__('neighbours', function(){
        return _.map(data.graphCache.getNeighbours()[nodeIndex], function(edgeIndex){
            return {
                node: getOther(edgeIndex),
                edge: edgeIndex
            };
        });
    });
}

/**
 * Accessor object for grpahs.
 *
 * The graphImpl graph implementation is expected to have the following properties:
 *   {
 *     nodes: [data1 data2, ...]  // the data each node holds
 *     // a list of pairs where each pair references two nodes by index
 *     edges: [
 *       [e1idx1, e1idx2],
 *       [e2idx1, e2idx2],
 *       ...
 *     ]
 *   }
 */
function Graph(graphImpl){
    var data = {
        graphImpl: graphImpl,
        graphCache: new GraphCache(this)
    };

    // nodes

    this.__defineGetter__('numNodes', function(){
        return graphImpl.nodes.length;
    });

    this.getNode = function(nodeIndex){
        return new Node(nodeIndex, data);
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
