var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

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
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/l-patch-2.json', {encoding: 'ascii'}));
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = self.surface.readSurface(buffer);
        expect(surface).to.be.eql(expectedResult);
    });
});
