var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('findFundamentalCut', function(){
    it('unfolds a box', function(){
        var graph = new self.graph.Graph(self.graph.readGraph(
            util.asciiResource('cutable.graph')));
        var spanningTree = new self.tree.Tree(self.tree.readTree(
            util.asciiResource('spanning.tree')));

        expect(self.graph.findFundamentalCut(graph, spanningTree, 10))
            .to.contain(2)
            .to.contain(10)
            .to.contain(15)
            .to.contain(19);

        expect(self.graph.findFundamentalCut(graph, spanningTree, 9))
            .to.contain(2)
            .to.contain(9)
            .to.contain(14)
            .to.contain(19);

        expect(self.graph.findFundamentalCut(graph, spanningTree, 6))
            .to.contain(2)
            .to.contain(7)
            .to.contain(6);

        expect(self.graph.findFundamentalCut(graph, spanningTree, 21))
            .to.contain(21);
    });
});