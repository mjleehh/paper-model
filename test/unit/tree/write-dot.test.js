var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('tree.writeDot', function(){
    it('writes simple trees', function(){
        var expectedResult = util.asciiResource('simple-tree.dot');
        var tree = new self.Tree(
                self.tree.readTree(
                    util.asciiResource('simple.tree')));
        expect(self.tree.writeDot(tree)).to.be.eql(expectedResult);
    });

    it('writes subgraph trees', function(){
        var expectedResult = util.asciiResource('subgraph-tree.dot');
        var tree = new self.Tree(
            self.tree.readTree(
                util.asciiResource('subgraph.tree')));
        expect(self.tree.writeDot(tree)).to.be.eql(expectedResult);
    });

    it('can also output the other edges in the graph', function(){
        var expectedResult = util.asciiResource('subgraph-tree-and-other-edges.dot');
        var tree = new self.Tree(
            self.tree.readTree(
                util.asciiResource('subgraph.tree')));
        expect(self.tree.writeDot(tree, true)).to.be.eql(expectedResult);
    });

    /*
    it('writes an empty graph', function(){
        var expectedResult = 'graph G {\n}\n';
        var graph = {
            nodes: [],
            edges: []
        };
        expect(self.graph.writeDot(graph)).to.be.eql(expectedResult);
    });

    it('writes cyclic graphs', function(){
        var expectedResult = util.asciiResource('cyclic.dot');
        var graph = self.graph.readGraph(
            util.asciiResource('cyclic.graph'));
        expect(self.graph.writeDot(graph)).to.be.eql(expectedResult);
    });

    it('writes complex graphs', function(){
        var expectedResult = util.asciiResource('complex.dot');
        var graph = self.graph.readGraph(
            util.asciiResource('complex.graph'));
        expect(self.graph.writeDot(graph)).to.be.eql(expectedResult);
    });
    */
});
