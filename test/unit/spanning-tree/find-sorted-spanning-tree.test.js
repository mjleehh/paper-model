var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('findSortedSpanningTree', function(){
    it('matches Shioura-Tamura critirion 1', function(){

    });

    it('matches Shioura-Tamura critirion 2', function(){

    });

    it('converts compmlex graphs', function(){
        //var expectedResult = util.jsonResource('complex.json');
        var graph = new self.graph.Graph(
            self.graph.readGraph(
                util.asciiResource('double-loop.graph')));
        var sortedSpanningTree = self.spanningTree.findSortedSpanningTree(graph);
        util.dumpAscii('sorted.dot', self.tree.writeDot(sortedSpanningTree));
        //expect(spanningTree).to.be.eql(expectedResult);
    });
});
