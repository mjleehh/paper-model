var self = require('../../../index');
var expect = require('chai').expect;
var fs = require('fs');

describe('converters', function(){
    it('fails if the graph is empty', function(){
        expect(function(){
            var graph = {
                nodes: []
            };
            self.converters.findSpanningTree(graph);
        }).to.throw(Error);
    });

    it('converts trivial graphs', function(){
        var graph = {
            nodes: [{
                value: 'one',
                neighbours: []
            }]
        };
        var tree = self.converters.findSpanningTree(graph);
        expect(tree).to.be.eql({
            value: 'one',
            children: []
        });
    });

    it('converts cyclic graphs', function(){
        var expectedResult = self.readTree(fs.readFileSync(__dirname + '/resources/cyclic.tree', {encoding: 'ascii'}));
        var graph = self.readGraph(fs.readFileSync(__dirname + '/resources/cyclic.graph', {encoding: 'ascii'}));

        var spanningTree = self.converters.findSpanningTree(graph);

        expect(spanningTree).to.be.eql(expectedResult);
    });
});
