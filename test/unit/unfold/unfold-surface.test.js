var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('unfoldSurface', function(){
    it('unfolds a box', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('unfolded-patch.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            util.asciiResource('patch.surface')));
        var tree = self.tree.readTree(
            util.asciiResource('unfold-patch.tree'));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds a pyramid', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('unfolded-pyramid.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            util.asciiResource('pyramid.surface')));
        var tree = self.tree.readTree(
            util.asciiResource('unfold-pyramid.tree'));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds an open pyramid', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('unfolded-open-pyramid.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            util.asciiResource('open-pyramid.surface')));
        var tree = self.tree.readTree(
            util.asciiResource('unfold-open-pyramid.tree'));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds two faces of a pyramid', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('unfolded-two-faces-of-a-pyramid.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            util.asciiResource('pyramid.surface')));
        var tree = self.tree.readTree(
            util.asciiResource('unfold-two-faces-of-a-pyramid.tree'));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds a pyramid as a fan', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('unfold-pyramid-fan.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            util.asciiResource('pyramid.surface')));
        var tree = self.tree.readTree(
            util.asciiResource('unfold-pyramid-fan.tree'));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });
});
