// jshint -W030
var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function getTestSurface(){
    var buffer = util.asciiResource('flat-square-donut.surface');
    var surfaceImpl = self.surface.readSurface(buffer);
    return new self.surface.Surface(surfaceImpl);
}

describe('FaceEdge', function(){
    it('has an id', function(){
        var surface = getTestSurface();

        for (var i = 0; i < surface.numFaceEdges; ++i){
            expect(surface.getFaceEdge(i).id).to.be.eql(i);
        }
    });

    it('has a neighbour', function(){
        var surface = getTestSurface();

        expect(surface.getFaceEdge(9).neighbour.id).to.be.eql(2);
        expect(surface.getFaceEdge(4).neighbour).to.be.null;
    });
});
