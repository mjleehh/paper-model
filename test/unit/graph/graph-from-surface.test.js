var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;


describe('graphFromSurface', function(){
    it('reads an empty file', function(){
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

    it('reads a file', function(){
        var expectedResult = {
            nodes: [0, 1, 2],
            edges: [[0, 1], [0, 2]]
        };
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var graph = self.graph.graphFromSurface(surface);
        expect(graph).to.be.eql(expectedResult);
    });
});
