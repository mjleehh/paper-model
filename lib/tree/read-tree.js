var _ = require('lodash');
var parseVerbLineData = require('../util/parse-verb-line-data');


function readTree(data){
    var rootNode = null;
    var nodes = [];
    var edges = [];

    var handlers = {
        'r': function(index){
            rootNode = parseInt(index);
        },
        'n': function(){
            var value = _.first(arguments);
            var children = _.map(
                _.rest(arguments),
                function(edgeToChildIndex){
                    return parseInt(edgeToChildIndex);
                });
            nodes.push({
                value: value,
                children: children
            });
        },
        'e': function(node1, node2){
            var node1Index = parseInt(node1);
            var node2Index = parseInt(node2);
            edges.push(_.sortBy([node1Index, node2Index]));
        },
        'd': function(){
            edges.push(null);
        }
    };

    parseVerbLineData(data, handlers);

    if (nodes.length < 1) {
        throw new Error('tree does not contain any nodes');
    }

    if (rootNode === null) {
        throw new Error('no root node specified');
    }

    return {
        nodes: nodes,
        edges: edges,
        rootNode: rootNode
    };
}

module.exports = readTree;
