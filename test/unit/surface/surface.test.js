var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('Surface', function(){
    // vertices

    it('has a number of vertices', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var numFaces = surface.numVertices;
        expect(numFaces).to.be.eql(8);
    });

    it('has single vertices', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        for (var i = 0; i < surface.numVertices; ++i) {
            expect(surface.getVertex(i).id).to.be.eql(i);
        }
    });

    it('has vertices', function(){
        var expectedResult = [
            {x: 0, y: 0, z: 0, firstHalfEdge: 0},
            {x: 1, y: 0, z: 0, firstHalfEdge: 1},
            {x: 2, y: 0, z: 0, firstHalfEdge: 5},
            {x: 0, y: 1, z: 0, firstHalfEdge: 2},
            {x: 1, y: 1, z: 0, firstHalfEdge: 6},
            {x: 2, y: 1, z: 0, firstHalfEdge: 7},
            {x: 0, y: 2, z: 0, firstHalfEdge: 9},
            {x: 1, y: 2, z: 0, firstHalfEdge: 11}
        ];
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var faces = surface.vertices;
        expect(faces).to.be.eql(expectedResult);
    });

    // face edges

    it('has a number of face edges', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var numFaces = surface.numFaceEdges;
        expect(numFaces).to.be.eql(12);
    });

    it('has single face edges', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        for (var i = 0; i < surface.numFaceEdges; ++i) {
            expect(surface.getFaceEdge(i).id).to.be.eql(i);
        }
    });

    it('has face edges', function(){
        var expectedResult = [
            {vertex: 1, nextHalfEdge: 3,  prevHalfEdge: 2,  face: 0, twin: null},
            {vertex: 2, nextHalfEdge: 5,  prevHalfEdge: 4,  face: 1, twin: null},
            {vertex: 0, nextHalfEdge: 0,  prevHalfEdge: 6,  face: 0, twin: null},
            {vertex: 4, nextHalfEdge: 6,  prevHalfEdge: 0,  face: 0, twin: 4},
            {vertex: 1, nextHalfEdge: 1,  prevHalfEdge: 7,  face: 1, twin: 3},
            {vertex: 5, nextHalfEdge: 7,  prevHalfEdge: 1,  face: 1, twin: null},
            {vertex: 3, nextHalfEdge: 2,  prevHalfEdge: 3,  face: 0, twin: 8},
            {vertex: 4, nextHalfEdge: 4,  prevHalfEdge: 5,  face: 1, twin: null},
            {vertex: 4, nextHalfEdge: 10, prevHalfEdge: 9,  face: 2, twin: 6},
            {vertex: 3, nextHalfEdge: 8,  prevHalfEdge: 11, face: 2, twin: null},
            {vertex: 7, nextHalfEdge: 11, prevHalfEdge: 8,  face: 2, twin: null},
            {vertex: 6, nextHalfEdge: 9,  prevHalfEdge: 10, face: 2, twin: null}
        ];
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var faces = surface.faceEdges;
        expect(faces).to.be.eql(expectedResult);
    });

    // faces

    it('has a number of faces', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var numFaces = surface.numFaces;
        expect(numFaces).to.be.eql(3);
    });

    it('has single faces', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        for (var i = 0; i < surface.numFaces; ++i) {
            expect(surface.getFace(i).id).to.be.eql(i);
        }
    });

    it('has faces', function(){
        var expectedResult = [
            {firstHalfEdge: 0},
            {firstHalfEdge: 1},
            {firstHalfEdge: 8}
        ];
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var faces = surface.faces;
        expect(faces).to.be.eql(expectedResult);
    });

    // edges

    it('has a number of edges', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var numEdges = surface.numEdges;
        expect(numEdges).to.be.eql(10);
    });

    it('has single edges', function(){
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        for (var i = 0; i < surface.numEdges; ++i) {
            expect(surface.getEdge(i).id).to.be.eql(i);
        }
    });

    it('has edges', function(){
        var expectedResult = [
            [0], [1], [2], [5], [7], [9], [10], [11], [3, 4], [6, 8]
        ];
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        expect(surface.edges).to.be.eql(expectedResult);
    });
});
