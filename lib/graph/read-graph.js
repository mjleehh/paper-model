var _ = require('lodash');
var parseVerbLineData = require('../util/parse-verb-line-data');


function readGraph(data){
    var nodes = [];
    var edges = [];

    var handlers = {
        'n': function(value){
            nodes.push(value);
        },
        'e': function(node1Idx, node2Idx){
            edges.push(_.sortBy([parseInt(node1Idx), parseInt(node2Idx)]));
        }
    };

    parseVerbLineData(data, handlers);

    return {
        nodes: nodes,
        edges: edges
    };
}

module.exports = readGraph;
