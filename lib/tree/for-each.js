var _ = require('lodash');


function StopSubtreeIteration(){}
function stopSubtree(){
    throw new StopSubtreeIteration();
}

// ---------------------------------------------------------------------------------------

function StopIteration(){}
function stop(){
    throw new StopIteration();
}

// ---------------------------------------------------------------------------------------

var forEach = function(tree, f){
    var traverse = function(node, parent, edgeIndex){
        try {
            f(node, parent, edgeIndex);
            _.forEach(node.children, function(connection){
                var child = tree.getNode(connection.node);
                traverse(child, node, connection.edge);
            });
        } catch (e) {
            if (!(e instanceof StopSubtreeIteration)) {
                throw e;
            }
        }
    };
    try {
        traverse(tree.rootNode, null, null, null);
    } catch (e) {
        if (!e instanceof StopIteration) {
            throw e;
        }
    }
};
forEach.stop = stop;
forEach.stopSubtree = stopSubtree;

module.exports = forEach;