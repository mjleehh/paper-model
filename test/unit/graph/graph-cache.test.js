var self = require('../../../index');
var GraphCache = require('../../../lib/graph/graph-cache');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('GraphCache', function(){
    it('can list of the connected edges for all nodes', function(){
        var expectedResult = [
            [0, 6, 7],
            [0, 1, 3, 8],
            [3, 4],
            [1, 2, 4],
            [5, 6, 8],
            [2, 5, 7]
        ];
        var graphImpl = self.graph.readGraph(
            util.asciiResource('complex.graph'));
        var graphCache = new GraphCache(graphImpl);
        expect(graphCache.getNeighbours()).to.be.eql(expectedResult);
    });
});
