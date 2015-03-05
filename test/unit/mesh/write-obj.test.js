/*jshint -W030 */
var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;


describe('writeObj', function(){
    it('writes an empty mesh', function(){
        var objData = self.mesh.writeObj({
            vertices: [],
            faces: []
        });
        expect(objData).to.be.empty;
    });

    it('writes a mesh', function(){
        var expectedResult = fs.readFileSync(__dirname + '/resources/box-plain.obj', {encoding: 'ascii'});
        var mesh = JSON.parse(
            fs.readFileSync(__dirname + '/resources/box.json', {encoding: 'ascii'}));
        var objData = self.mesh.writeObj(mesh);
        expect(objData).to.be.eql(expectedResult);
    });
});
