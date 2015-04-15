var _ = require('lodash');


function StopIteration(){
    //
}

// ---------------------------------------------------------------------------------------

function stop(){
    throw new StopIteration();
}
exports.stop = stop;

// ---------------------------------------------------------------------------------------

var forEach = function(tree, f){
    var traverse = function(node, parent, edgeIndex){
        f(node, parent, edgeIndex);
        _.forEach(node.children, function(connection){
            var child = tree.getNode(connection.node);
            traverse(child, node, connection.edge);
        });
    };
    try {
        traverse(tree.rootNode, null, null, null);
    } catch (e) {
        if (typeof e !== StopIteration) {
            throw e;
        }
    }
};
exports.forEach = forEach;
