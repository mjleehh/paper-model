var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


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
        var expectedResult = util.jsonResource('box.json');
        var mesh = self.mesh.readObj(
            util.asciiResource('box.obj'));
        expect(mesh).to.be.eql(expectedResult);
    });
});
