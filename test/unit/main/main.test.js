var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;


describe('main', function(){
    it('creates a paper model of a box', function(){
        var expectedResult = JSON.parse(
            fs.readFileSync(__dirname + '/resources/box-paper-model.json', {encoding: 'ascii'}));
        var mesh = self.mesh.readObj(fs.readFileSync(__dirname + '/resources/box.obj', {encoding: 'ascii'}));
        var paperModel = self.createPaperModel(mesh);

        expect(paperModel).to.be.eql(expectedResult);
    });
});
