var self = require('../../../index');
var expect = require('chai').expect;
var fs = require('fs');

describe('findSpanningTree', function(){
    it('fails if the graph is empty', function(){
        expect(function(){
            var graph = new self.graph.Graph({
                nodes: []
            });
            self.tree.spanningTrees(graph);
        }).to.throw(Error);
    });

    /*
    it('converts trivial graphs', function(){
        var graph = new self.graph.Graph({
            nodes: [{
                value: 'one',
                neighbours: []
            }]
        });
        var tree = self.tree.spanningTrees(graph);
        expect(tree).to.be.eql({
            nodes: [{
                value: 'one',
                children: []
            }],
            rootNode: 0
        });
    });
    */

    it('fails if graph has disconnected components', function(){
        expect(function(){
            var graph = new self.graph.Graph(
                self.graph.readGraph(fs.readFileSync(
                    __dirname + '/resources/disconnected.graph', {encoding: 'ascii'})));
            self.tree.spanningTrees(graph);
        }).to.throw(Error);
    });

    /*it('finds spanning trees of triple triangle graph', function(){
        var graph = new self.graph.Graph(
            self.graph.readGraph(fs.readFileSync(__dirname + '/resources/triple-tri.graph', {encoding: 'ascii'})));
        //self.tree.spanningTrees(graph);
        //expect(spanningTree).to.be.eql(expectedResult);
    });*/
});
