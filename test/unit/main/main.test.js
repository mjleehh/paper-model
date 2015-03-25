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

    it('creates a paper model of a pyramid', function(){
        //var expectedResult = JSON.parse(
        //    fs.readFileSync(__dirname + '/resources/box-paper-model.json', {encoding: 'ascii'}));
        var mesh = self.mesh.readObj(fs.readFileSync(__dirname + '/resources/pyramid.obj', {encoding: 'ascii'}));
        var paperModel = self.createPaperModel(mesh);
        fs.writeFileSync(__dirname + '/output.obj', self.mesh.writeObj(paperModel));

        //expect(paperModel).to.be.eql(expectedResult);
    });
});
