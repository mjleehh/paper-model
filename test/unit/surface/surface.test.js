var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('Surface', function(){
    // faces

    it('has a number of faces', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var numFaces = surface.numFaces;
        expect(numFaces).to.be.eql(3);
    });

    it('has single faces', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        for (var i = 0; i < surface.numFaces; ++i) {
            surface.getFace(i);
        }
    });

    it('has faces', function(){
        var expectedResult = [
            {firstHalfEdge: 0},
            {firstHalfEdge: 1},
            {firstHalfEdge: 8}
        ];
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var faces = surface.faces;
        expect(faces).to.be.eql(expectedResult);
    });

    // edges

    it('has a number of edges', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var numEdges = surface.numEdges;
        expect(numEdges).to.be.eql(10);
    });

    it('has single edges', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        for (var i = 0; i < surface.numEdges; ++i) {
            surface.getEdge(i);
        }
    });

    it('has edges', function(){
        var expectedResult = [
            [0], [1], [2], [5], [7], [9], [10], [11], [3, 4], [6, 8]
        ];
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        expect(surface.edges).to.be.eql(expectedResult);
    });
});
