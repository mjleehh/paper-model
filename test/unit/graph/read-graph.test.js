var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


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
        var graph = self.graph.readGraph(
            util.asciiResource('cyclic.graph'));
        expect(graph).to.be.eql(expectedResult);
    });

    it('reads complex graphs', function(){
        var expectedResult = util.jsonResource('complex.json');
        var graph = self.graph.readGraph(
            util.asciiResource('complex.graph'));
        expect(graph).to.be.eql(expectedResult);
    });
});
