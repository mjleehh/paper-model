// jshint -W030
var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('flat mesh intersection', function(){
    it('treats faces that lie apart as non intersecting', function(){
        var mesh = self.mesh.readObj(
            util.asciiResource('separate-face-flat-mesh.obj'));
        expect(self.algorithms.flatMesh.flatMeshIntersects(mesh)).to.be.false;
    });

    it('treats aligned faces as non intersecting', function(){
        var mesh = self.mesh.readObj(
            util.asciiResource('triangle-squares.obj'));
        expect(self.algorithms.flatMesh.flatMeshIntersects(mesh)).to.be.false;
    });

    it('treats an unfolded pyramid as non intersecting', function(){
        var mesh = self.mesh.readObj(
            util.asciiResource('unfolded-pyramid.obj'));
        expect(self.algorithms.flatMesh.flatMeshIntersects(mesh)).to.be.false;
    });

    it('detects intersections', function(){
        var mesh = self.mesh.readObj(
            util.asciiResource('intersecting-flat-mesh.obj'));
        expect(self.algorithms.flatMesh.flatMeshIntersects(mesh)).to.be.true;
    });
});
