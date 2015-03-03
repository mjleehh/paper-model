var _ = require('lodash');
var parseVerbLineData = require('../util/parse-verb-line-data');


function readGraph(data){
    var nodes = [];
    var edges = [];

    var handlers = {
        'n': function(value){
            nodes.push({
                value: value,
                edges: []
            });
        },
        'e': function(node1, node2){
            var node1Index = parseInt(node1);
            var node2Index = parseInt(node2);
            var edgeIndex = edges.push(_.sortBy([node1Index, node2Index])) - 1;
            nodes[node1Index].edges.push(edgeIndex);
            nodes[node2Index].edges.push(edgeIndex);
        }
    };

    parseVerbLineData(data, handlers);

    return {
        nodes: nodes,
        edges: edges
    };
}

module.exports = readGraph;
