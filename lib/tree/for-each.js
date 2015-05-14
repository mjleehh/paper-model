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

/** Iterate a tree depth first
 *
 * The iteration callback accepts 3 arguments: node, parent, edgeIndex
 * - node: the current tree node
 * - parent: the parent tree node of the current node
 * - edgeIndex: the index of the edge connecting the current tree node to its parent
 *
 * There are two methods for controlling iteration:
 * - stop: ends the entire iteration process
 * - stopSubtree: continue iteration, but do not iterate the subtree below the current
 *                tree node
 *
 */
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