var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('graphFromSurface', function(){
    it('converts an empty surface', function(){
        var expectedResult = {
            nodes: [],
            edges: []
        };
        var surface = new self.surface.Surface({
            vertices: [],
            halfEdges: [],
            faces: []
        });
        var graph = self.graph.graphFromSurface(surface);
        expect(graph).to.be.eql(expectedResult);
    });

    it('converts a simple surface', function(){
        var expectedResult = {
            nodes: [
                {
                    value: 0,
                    edges: [0, 1]
                },
                {
                    value: 1,
                    edges: [0]
                },
                {
                    value: 2,
                    edges: [1]
                }
            ],
            edges: [[0, 1], [0, 2]]
        };
        var surface = new self.surface.Surface(
            self.surface.readSurface(
                util.asciiResource('l-patch-2.surface')));
        var graph = self.graph.graphFromSurface(surface);
        expect(graph).to.be.eql(expectedResult);
    });
});
