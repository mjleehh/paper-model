var self = require('../../../index');
//var _ = require('lodash');
var fs = require('fs');
var expect = require('chai').expect;


describe('surfaceFromMesh', function(){
    it('converts simple meshes', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/l-patch.json', {encoding: 'ascii'}));
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch.obj', {encoding: 'ascii'});
        var mesh = self.mesh.readObj(buffer);
        var surface = self.surfaceFromMesh(mesh);
        expect(surface).to.be.eql(expectedResult);
    });

    it('fails on non manifold edges', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/non-manifold-extruded-t.obj', {encoding: 'ascii'});
        var mesh = self.mesh.readObj(buffer);
        expect(function(){
            self.surfaceFromMesh(mesh);
        }).to.throw(Error);
    });
});