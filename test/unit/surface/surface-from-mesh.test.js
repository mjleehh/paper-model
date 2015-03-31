var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('surfaceFromMesh', function(){
    it('converts simple meshes', function(){
        var expectedResult = JSON.parse(util.asciiResource('l-patch.json'));
        var buffer = util.asciiResource('l-patch.obj');
        var mesh = self.mesh.readObj(buffer);
        var surface = self.surface.surfaceFromMesh(mesh);
        expect(surface).to.be.eql(expectedResult);
    });

    it('fails on non manifold edges', function(){
        var buffer = util.asciiResource('non-manifold-extruded-t.obj');
        var mesh = self.mesh.readObj(buffer);
        expect(function(){
            self.surface.surfaceFromMesh(mesh);
        }).to.throw(Error);
    });
});