var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('Face', function(){
    it('has edges getter', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        var edgeIndices = surface.getFace(0).edges;
        expect(edgeIndices).to.be.eql([0, 3, 6, 2]);
    });

    it('has connectedFaces getter', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        var connectedFacesIndices = surface.getFace(0).connectedFaces;
        expect(connectedFacesIndices).to.be.eql([1, 2]);
    });
});
