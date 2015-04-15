var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('sortSpanningTrees', function(){
    it('matches Shioura-Tamura critirion 1', function(){

    });

    it('matches Shioura-Tamura critirion 2', function(){

    });

    it('converts compmlex graphs', function(){
        //var expectedResult = util.jsonResource('complex.json');
        var graph = new self.graph.Graph(
            self.graph.readGraph(
                util.asciiResource('complex.graph')));
        var sortedSpanningTree = self.spanningTrees.findSortedSpanningTree(graph);
        //util.dumpJson('sorted.json',
        //    sortSpanningTree(spanningTree));
        //expect(spanningTree).to.be.eql(expectedResult);
    });
});
