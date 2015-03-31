var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('surfaceFromMesh', function(){
    it('converts simple meshes', function(){
        var expectedResult = util.jsonResource('l-patch.json');
        var mesh = self.mesh.readObj(util.asciiResource('l-patch.obj'));
        var surface = self.surface.surfaceFromMesh(mesh);
        expect(surface).to.be.eql(expectedResult);
    });

    it('fails on non manifold edges', function(){
        var mesh = self.mesh.readObj(
            util.asciiResource('non-manifold-extruded-t.obj'));
        expect(function(){
            self.surface.surfaceFromMesh(mesh);
        }).to.throw(Error);
    });
});