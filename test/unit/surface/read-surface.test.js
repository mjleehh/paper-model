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
        var expectedResult = JSON.parse(util.asciiResource('l-patch-2.json'));
        var buffer = util.asciiResource('l-patch-2.surface');
        var surface = self.surface.readSurface(buffer);
        expect(surface).to.be.eql(expectedResult);
    });
});
