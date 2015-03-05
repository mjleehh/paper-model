var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('meshFromSurface', function(){
    it('converts an empty surface', function(){
        var expectedResult = {
            vertices: [],
            faces: []
        };
        var surface = new self.surface.Surface({
            vertices: [],
            halfEdges: [],
            faces: []
        });
        var mesh = self.mesh.meshFronSurface(surface);
        expect(mesh).to.be.eql(expectedResult);
    });

    it('converts a simple surface', function(){
        var expectedResult = JSON.parse(
            fs.readFileSync(__dirname + '/resources/l-patch-2.mesh.json', {encoding: 'ascii'}));
        var surface = new self.surface.Surface(JSON.parse(
            fs.readFileSync(__dirname + '/resources/l-patch-2.surface.json', {encoding: 'ascii'})));
        var mesh = self.mesh.meshFronSurface(surface);
        expect(mesh).to.be.eql(expectedResult);
    });
});
