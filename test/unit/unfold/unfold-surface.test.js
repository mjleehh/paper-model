var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;


describe('unfoldSurface', function(){
    it('unfolds a box', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/unfolded-patch.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            fs.readFileSync(__dirname + '/resources/patch.surface', {encoding: 'ascii'})));
        var tree = self.tree.readTree(fs.readFileSync(__dirname + '/resources/unfold-patch.tree', {encoding: 'ascii'}));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds a pyramid', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/unfolded-pyramid.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            fs.readFileSync(__dirname + '/resources/pyramid.surface', {encoding: 'ascii'})));
        var tree = self.tree.readTree(
            fs.readFileSync(__dirname + '/resources/unfold-pyramid.tree', {encoding: 'ascii'}));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds an open pyramid', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/unfolded-open-pyramid.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            fs.readFileSync(__dirname + '/resources/open-pyramid.surface', {encoding: 'ascii'})));
        var tree = self.tree.readTree(
            fs.readFileSync(__dirname + '/resources/unfold-open-pyramid.tree', {encoding: 'ascii'}));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds two faces of a pyramid', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/unfolded-two-faces-of-a-pyramid.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            fs.readFileSync(__dirname + '/resources/pyramid.surface', {encoding: 'ascii'})));
        var tree = self.tree.readTree(
            fs.readFileSync(__dirname + '/resources/unfold-two-faces-of-a-pyramid.tree', {encoding: 'ascii'}));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });

    it('unfolds a pyramid as a fan', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/unfold-pyramid-fan.json'));
        var surface = new self.surface.Surface(self.surface.readSurface(
            fs.readFileSync(__dirname + '/resources/pyramid.surface', {encoding: 'ascii'})));
        var tree = self.tree.readTree(
            fs.readFileSync(__dirname + '/resources/unfold-pyramid-fan.tree', {encoding: 'ascii'}));
        var result = self.unfold.unfoldSurface(surface, tree);

        expect(result).to.be.eql(expectedResult);
    });
});
