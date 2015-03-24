// jshint -W030
var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;


describe('face intersection', function(){
    it('treats faces that lie apart as non intersecting', function(){
        var mesh = self.mesh.readObj(
            fs.readFileSync(__dirname + '/resources/separate-face-flat-mesh.obj', {encoding: 'ascii'}));
        expect(self.algorithms.flatMesh.flatMeshIntersects(mesh)).to.be.false;
    });

    it('treats aligned faces as non intersecting', function(){
        var mesh = self.mesh.readObj(
            fs.readFileSync(__dirname + '/resources/triangle-squares.obj', {encoding: 'ascii'}));
        expect(self.algorithms.flatMesh.flatMeshIntersects(mesh)).to.be.false;
    });

    it('detects intersections', function(){
        var mesh = self.mesh.readObj(
            fs.readFileSync(__dirname + '/resources/intersecting-flat-mesh.obj', {encoding: 'ascii'}));
        expect(self.algorithms.flatMesh.flatMeshIntersects(mesh)).to.be.true;
    });
});
