// jshint -W030
var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

function getTestSurface(){
    var buffer = fs.readFileSync(__dirname + '/resources/flat-square-donut.surface', {encoding: 'ascii'});
    var surfaceImpl = self.surface.readSurface(buffer);
    return new self.surface.Surface(surfaceImpl);
}

describe('Edge', function(){
    it('has an id', function(){
        var surface = getTestSurface();

        for (var i = 0; i < surface.numEdges; ++i){
            expect(surface.getEdge(i).id).to.be.eql(i);
        }
    });

    it('can be at border', function(){
        var surface = getTestSurface();

        expect(surface.getEdge(5).isBorder).to.be.true;
        expect(surface.getEdge(10).isBorder).to.be.false;
    });

    it('has faces', function(){
        var surface = getTestSurface();

        expect(surface.getEdge(9).faces).to.be.eql([0, 1]);
    });
});
