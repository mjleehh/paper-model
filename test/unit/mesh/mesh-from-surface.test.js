var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('meshFromSurface', function(){
    it('converts an empty surface', function(){
        var expectedResult = {
            vertices: [],
            faces: []
        };
        var surface = new self.Surface({
            vertices: [],
            halfEdges: [],
            faces: []
        });
        var mesh = self.mesh.meshFronSurface(surface);
        expect(mesh).to.be.eql(expectedResult);
    });

    it('converts a simple surface', function(){
        var expectedResult = util.jsonResource('l-patch-2.mesh.json');
        var surface = new self.Surface(
            util.jsonResource('l-patch-2.surface.json'));
        var mesh = self.mesh.meshFronSurface(surface);
        expect(mesh).to.be.eql(expectedResult);
    });
});
