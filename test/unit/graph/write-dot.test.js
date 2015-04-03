var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('writeDot', function(){
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
});
