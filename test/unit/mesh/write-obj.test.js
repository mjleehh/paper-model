// jshint -W030
var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('writeObj', function(){
    it('writes an empty mesh', function(){
        var objData = self.mesh.writeObj({
            vertices: [],
            faces: []
        });
        expect(objData).to.be.empty;
    });

    it('writes a mesh', function(){
        var expectedResult = util.asciiResource('box-plain.obj');
        var objData = self.mesh.writeObj(
            util.jsonResource('box.json'));
        expect(objData).to.be.eql(expectedResult);
    });
});
