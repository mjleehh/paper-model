var self = require('../../../index');
var fs = require('fs');
//var expect = require('chai').expect;

describe('main', function(){
    it('creates a paper model', function(){
        var mesh = self.mesh.readObj(fs.readFileSync(__dirname + '/resources/box.obj', {encoding: 'ascii'}));
        fs.writeFileSync(__dirname + '/output.obj', self.mesh.writeObj(self.createPaperModel(mesh)));
    });
});
