var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function getTestSurface(){
    var surfaceImpl = self.surface.readSurface(
        util.asciiResource('flat-square-donut.surface'));
    return new self.Surface(surfaceImpl);
}

describe('Vertex', function(){
    it('has an id', function(){
        var surface = getTestSurface();

        for (var i = 0; i < surface.numVertices; ++i){
            expect(surface.getVertex(i).id).to.be.eql(i);
        }
    });

    it('has x', function(){
        var surface = getTestSurface();

        expect(surface.getVertex(3).x).to.be.eql(2);
        expect(surface.getVertex(0).x).to.be.eql(0);
        expect(surface.getVertex(5).x).to.be.eql(2);
        expect(surface.getVertex(2).x).to.be.eql(1);
        expect(surface.getVertex(7).x).to.be.eql(1);
    });

    it('has y', function(){
        var surface = getTestSurface();

        expect(surface.getVertex(3).y).to.be.eql(1);
        expect(surface.getVertex(0).y).to.be.eql(0);
        expect(surface.getVertex(5).y).to.be.eql(2);
        expect(surface.getVertex(2).y).to.be.eql(1);
        expect(surface.getVertex(7).y).to.be.eql(3);
    });

    it('has z', function(){
        var surface = getTestSurface();

        expect(surface.getVertex(3).z).to.be.eql(0);
        expect(surface.getVertex(0).z).to.be.eql(0);
        expect(surface.getVertex(5).z).to.be.eql(0);
        expect(surface.getVertex(2).z).to.be.eql(0);
        expect(surface.getVertex(7).z).to.be.eql(0);
    });
});
