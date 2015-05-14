var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('findCut', function(){
    it('can separate a graph through the edge of a spanning tree', function(){
        var spanningTree = new self.Tree(self.tree.readTree(
            util.asciiResource('spanning.tree')));

        expect(self.spanningTree.findCut(spanningTree, 10))
            .to.contain(2)
            .to.contain(10)
            .to.contain(15)
            .to.contain(19);

        expect(self.spanningTree.findCut(spanningTree, 9))
            .to.contain(2)
            .to.contain(9)
            .to.contain(14)
            .to.contain(19);

        expect(self.spanningTree.findCut(spanningTree, 6))
            .to.contain(2)
            .to.contain(7)
            .to.contain(6);

        expect(self.spanningTree.findCut(spanningTree, 21))
            .to.contain(21);

        expect(self.spanningTree.findCut(spanningTree, 16))
            .to.contain(16);
    });
});
