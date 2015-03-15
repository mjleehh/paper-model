var _ = require('lodash');
var parseVerbLineData = require('../util/parse-verb-line-data');


function readTree(data){
    var rootNode = null;
    var nodes = [];

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
            var node = _.first(arguments);
            nodes[node].children =  _.map(_.rest(arguments), function(elem){
                return parseInt(elem);
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
        rootNode: rootNode
    };
}

module.exports = readTree;
