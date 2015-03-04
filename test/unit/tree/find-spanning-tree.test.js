var self = require('../../../index');
var expect = require('chai').expect;
var fs = require('fs');

describe('findSpanningTree', function(){
    it('fails if the graph is empty', function(){
        expect(function(){
            var graph = new self.graph.Graph({
                nodes: []
            });
            self.converters.findSpanningTree(graph);
        }).to.throw(Error);
    });

    it('converts trivial graphs', function(){
        var graph = new self.graph.Graph({
            nodes: [{
                value: 'one',
                neighbours: []
            }]
        });
        var tree = self.tree.findSpanningTree(graph);
        expect(tree).to.be.eql({
            nodes: [{
                value: 'one',
                children: []
            }],
            rootNode: 0
        });
    });

    it('converts cyclic graphs', function(){
        var expectedResult = self.tree.readTree(fs.readFileSync(
            __dirname + '/resources/cyclic.tree',
            {encoding: 'ascii'}));
        var graph = new self.graph.Graph(
            self.graph.readGraph(fs.readFileSync(__dirname + '/resources/cyclic.graph', {encoding: 'ascii'})));
        var spanningTree = self.tree.findSpanningTree(graph);
        expect(spanningTree).to.be.eql(expectedResult);
    });
});
