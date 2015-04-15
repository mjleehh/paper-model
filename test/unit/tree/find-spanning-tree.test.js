var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('findSpanningTree', function(){
    it('fails if the graph is empty', function(){
        expect(function(){
            var graph = new self.graph.Graph({
                nodes: []
            });
            self.tree.findSpanningTree(graph);
        }).to.throw(Error);
    });

    it('converts trivial graphs', function(){
        var graph = new self.graph.Graph({
            nodes: ['one'],
            edges: []
        });
        var tree = self.spanningTrees.findSpanningTree(graph);
        expect(tree).to.be.eql({
            nodes: [{
                value: 'one',
                children: []
            }],
            edges: [],
            rootNode: 0
        });
    });

    it('fails if graph has disconnected components', function(){
        expect(function(){
            var graph = new self.graph.Graph(
                self.graph.readGraph(
                    util.asciiResource('disconnected.graph')));
            self.tree.findSpanningTree(graph);
        }).to.throw(Error);
    });

    it('converts cyclic graphs', function(){
        var expectedResult = util.jsonResource('cyclic.json');
        var graph = new self.graph.Graph(
            self.graph.readGraph(
                util.asciiResource('cyclic.graph')));
        var spanningTree = self.spanningTrees.findSpanningTree(graph);
        expect(spanningTree).to.be.eql(expectedResult);
    });

    it('converts compmlex graphs', function(){
        var expectedResult = util.jsonResource('complex.json');
        var graph = new self.graph.Graph(
            self.graph.readGraph(
                util.asciiResource('complex.graph')));
        var spanningTree = self.spanningTrees.findSpanningTree(graph);
        expect(spanningTree).to.be.eql(expectedResult);
    });
});
