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
        'n': function(value){
            nodes.push({
                value: value,
                children: []
            });
        },
        'c': function(){
            var nodeIndex = parseInt(_.first(arguments));
            nodes[nodeIndex].children =  _.map(_.rest(arguments), function(elem){
                var childIndex = parseInt(elem);
                return edges.push(_.sortBy([nodeIndex, childIndex])) - 1;
            });
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
