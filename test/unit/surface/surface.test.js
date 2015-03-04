var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('Surface', function(){
    it('has a number of faces', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        var numFaces = surface.numFaces;
        expect(numFaces).to.be.eql(3);
    });

    it('has single faces', function(){
        //var expectedResult =
        // JSON.parse(fs.readFileSync(__dirname + '/resources/l-patch-2.json', {encoding: 'ascii'}));
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));

        for (var i = 0; i < surface.numFaces; ++i) {
            surface.getFace(i);
        }
    });

    it('has edges', function(){
        var expectedResult = [
            [0], [1], [2], [5], [7], [9], [10], [11], [3, 4], [6, 8]
        ];
        var buffer = fs.readFileSync(__dirname + '/resources/l-patch-2.surface', {encoding: 'ascii'});
        var surface = new self.surface.Surface(self.surface.readSurface(buffer));
        expect(surface.edges).to.be.eql(expectedResult);
    });
});
