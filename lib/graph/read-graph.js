var _ = require('lodash');


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
    return {
        nodes: nodes,
        edges: edges
    };
}

module.exports = readGraph;
