var _ = require('lodash');
var findCut = require('./find-cut');


function createEntryFinder(initialSpanningTree, cutEdgeIndex){
    var edgeIsInIntialTreeCut = new Array(initialSpanningTree.numEdges);
    _.forEach(findCut(initialSpanningTree, cutEdgeIndex), function(edgeIndex){
        edgeIsInIntialTreeCut[edgeIndex] = true;
    });

    return function(spanningTree){
        _.find(findCut(spanningTree), function(edgeIndex){
            return edgeIsInIntialTreeCut[edgeIndex];
        });
    };
}
module.exports = createEntryFinder;
