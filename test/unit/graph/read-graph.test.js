var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('readGraph', function(){
    it('reads an empty file', function(){
        var expectedResult = {
            nodes: [],
            edges: []
        };
        var graph = self.graph.readGraph('');
        expect(graph).to.be.eql(expectedResult);
    });

    it('reads cyclic graphs', function(){
        var expectedResult = {
            nodes: ['one', 'two', 'three'],
            edges: [[0, 1], [1, 2], [0, 2]]
        };
        var buffer = fs.readFileSync(__dirname + '/resources/cyclic.graph', {encoding: 'ascii'});
        var graph = self.graph.readGraph(buffer);
        expect(graph).to.be.eql(expectedResult);
    });

    it('reads complex graphs', function(){
        var expectedResult = {
            nodes: ['one', 'two', 'three', 'four', 'five'],
            edges: [[0, 1], [1, 3], [3, 5], [1, 2], [2, 3], [4, 5], [0, 4], [0, 5], [1, 4]]
        };
        var buffer = fs.readFileSync(__dirname + '/resources/complex.graph', {encoding: 'ascii'});
        var graph = self.graph.readGraph(buffer);
        expect(graph).to.be.eql(expectedResult);
    });
});
