var _ = require('lodash');
var sets = require('simplesets');
var parseVerbLineData = require('../util/parse-verb-line-data');


function readTree(data){
    var nodes = [];
    var rootNodeCandidates = new sets.Set();

    var handlers = {
        'n': function(value){
            rootNodeCandidates.add(nodes.length);
            nodes.push({
                value: value,
                children: []
            });
        },
        'c': function(){
            var node = _.first(arguments);
            var children =  _.map(_.rest(arguments), function(elem){
                return parseInt(elem);
            });
            rootNodeCandidates = rootNodeCandidates.difference(new sets.Set(children));
            nodes[node].children = children;
        }
    };

    parseVerbLineData(data, handlers);

    if (nodes.length < 1) {
        throw new Error('tree does not contain any nodes');
    }

    var rootNodes = rootNodeCandidates.array();
    if (rootNodes.length !== 1) {
        throw new Error('invalid root node candidates ' + rootNodes.length);
    }

    return {
        nodes: nodes,
        rootNode: _.first(rootNodes)
    };
}

module.exports = readTree;
