var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('main', function(){
    it('creates a paper model of a box', function(){
        var expectedResult = util.jsonResource('box-paper-model.json');
        var mesh = self.mesh.readObj(
            util.asciiResource('box.obj'));
        var paperModel = self.createPaperModel(mesh);

        expect(paperModel).to.be.eql(expectedResult);
    });

    it('creates a paper model of a pyramid', function(){
        var expectedResult = util.jsonResource('pyramid.json');
        var mesh = self.mesh.readObj(
            util.asciiResource('pyramid.obj'));
        var paperModel = self.createPaperModel(mesh);

        expect(paperModel).to.be.eql(expectedResult);
    });
});
