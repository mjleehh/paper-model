// jshint -W030
var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function getTestSurface(){
    var surfaceImpl = self.surface.readSurface(
        util.asciiResource('flat-square-donut.surface'));
    return new self.Surface(surfaceImpl);
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
