var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

function getTestSurface(){
    var buffer = fs.readFileSync(__dirname + '/resources/flat-square-donut.surface', {encoding: 'ascii'});
    var surfaceImpl = self.surface.readSurface(buffer);
    return new self.surface.Surface(surfaceImpl);
}

describe('Face', function(){
    it('has an id', function(){
        var surface = getTestSurface();

        for (var i = 0; i < surface.numFaces; ++i){
            expect(surface.getFace(i).id).to.be.eql(i);
        }
    });

    it('has edges', function(){
        var surface = getTestSurface();

        var edgeIndices = surface.getFace(0).edges;
        expect(edgeIndices).to.be.eql([0, 1, 2, 3, 4, 5]);
    });

    it('has vertices', function(){
        var surface = getTestSurface();

        var edgeIndices = surface.getFace(0).vertices;
        expect(edgeIndices).to.be.eql([1, 8, 5, 3, 2, 0]);
    });

    it('has connectedFaces getter', function(){
        var surface = getTestSurface();

        var connectedFacesIndices = surface.getFace(0).connectedFaces;
        expect(connectedFacesIndices).to.be.eql([1, 2]);
    });
});
