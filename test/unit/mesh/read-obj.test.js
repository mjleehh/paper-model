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
        var expectedResult = JSON.parse(
            util.asciiResource('box.json'));
        var buffer = util.asciiResource('box.obj');
        var mesh = self.mesh.readObj(buffer);
        expect(mesh).to.be.eql(expectedResult);
    });
});
