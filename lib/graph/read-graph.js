var _ = require('lodash');
var parseVerbLineData = require('../util/parse-verb-line-data');


function readGraph(data){
    var nodes = [];
    var edges = [];

    var handlers = {
        'n': function(value){
            nodes.push(value);
        },
        'e': function(node1, node2){
            var node1Index = parseInt(node1);
            var node2Index = parseInt(node2);
            edges.push(_.sortBy([node1Index, node2Index]));
        }
    };

    parseVerbLineData(data, handlers);

    return {
        nodes: nodes,
        edges: edges
    };
}

module.exports = readGraph;
