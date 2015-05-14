var _ = require('lodash');


function GraphCache(graphImpl){
    var my = {};

    var updateNeighbours = function(){
        var neighbours = _.map(graphImpl.nodes, function(){
            return [];
        });

        _.forEach(graphImpl.edges, function(edge, edgeIndex){
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
module.exports = GraphCache;
