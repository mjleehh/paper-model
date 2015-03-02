var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('readObj', function(){
    it('reads an empty file', function(){
        var expectedResult = {
            vertices: [],
            faces: []
        };
        var mesh = self.mesh.readObj('');
        expect(mesh).to.be.eql(expectedResult);
    });

    it('reads a file', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/box.json', {encoding: 'ascii'}));
        var buffer = fs.readFileSync(__dirname + '/resources/box.obj', {encoding: 'ascii'});
        var mesh = self.mesh.readObj(buffer);
        expect(mesh).to.be.eql(expectedResult);
    });
});
