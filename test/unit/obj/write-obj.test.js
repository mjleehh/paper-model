/*jshint -W030 */
var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;


describe('write-obj', function(){
    it('writes an empty mesh', function(){
        var objData = self.writeObj({
            vertices: [],
            faces: []
        });
        expect(objData).to.be.empty;
    });

    it('writes a mesh', function(){
        var expectedResult = fs.readFileSync(__dirname + '/resources/box-plain.obj', {encoding: 'ascii'});
        var inputData = fs.readFileSync(__dirname + '/resources/box.obj', {encoding: 'ascii'});
        var mesh = self.readObj(inputData);
        var objData = self.writeObj(mesh);
        expect(objData).to.be.eql(expectedResult);
    });
});