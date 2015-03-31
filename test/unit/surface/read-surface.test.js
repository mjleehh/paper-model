var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('readSurface', function(){
    it('reads an empty file', function(){
        var expectedResult = {
            vertices: [],
            halfEdges: [],
            faces: []
        };
        var mesh = self.surface.readSurface('');
        expect(mesh).to.be.eql(expectedResult);
    });

    it('reads a file', function(){
        var expectedResult = util.jsonResource('l-patch-2.json');
        var surface = self.surface.readSurface(
            util.asciiResource('l-patch-2.surface'));
        expect(surface).to.be.eql(expectedResult);
    });
});
