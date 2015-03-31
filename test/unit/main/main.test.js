var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;
var util = require('../util')(__dirname);

describe('main', function(){
    it('creates a paper model of a box', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('box-paper-model.json'));
        var mesh = self.mesh.readObj(
            util.asciiResource('box.obj'));
        var paperModel = self.createPaperModel(mesh);

        expect(paperModel).to.be.eql(expectedResult);
    });

    it('creates a paper model of a pyramid', function(){
        var expectedResult = JSON.parse(
            util.asciiResource('pyramid.json'));
        var mesh = self.mesh.readObj(
            util.asciiResource('pyramid.obj'));
        var paperModel = self.createPaperModel(mesh);

        expect(paperModel).to.be.eql(expectedResult);
    });
});
