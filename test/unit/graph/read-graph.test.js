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
            nodes: [{
                    value: 'one',
                    edges: [0, 2]
                },
                {
                    value: 'two',
                    edges: [0, 1]
                },
                {
                    value: 'three',
                    edges: [1, 2]
                }
            ],
            edges: [[0, 1], [1, 2], [0, 2]]
        };
        var buffer = util.asciiResource('cyclic.graph');
        var graph = self.graph.readGraph(buffer);
        expect(graph).to.be.eql(expectedResult);
    });

    it('reads complex graphs', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('complex.json'));
        var buffer = util.asciiResource('complex.graph');
        var graph = self.graph.readGraph(buffer);
        expect(graph).to.be.eql(expectedResult);
    });
});
