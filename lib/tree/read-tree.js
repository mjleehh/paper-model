var _ = require('lodash');
var sets = require('simplesets');


function readGraph(data){
    var nodes = [];
    var rootNodeCandidates = new sets.Set();

    var handlers = {
        'n': function(value){
            rootNodeCandidates.add(nodes.length);
            nodes.push({
                value: value,
                children: null
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

    var lines = data.split('\n');
    for (var i = 0; i < lines.length; ++i) {
        var words = lines[i].split(' ');
        words.filter(function(word){
            return word === '' || word === '\r';
        });
        if (words.length > 1) {
            var verb = words[0];
            var nouns = words.slice(1);
            if (handlers.hasOwnProperty(verb)) {
                handlers[verb].apply(null, nouns);
            }
        }
    }

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

module.exports = readGraph;
