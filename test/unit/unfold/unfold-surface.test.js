var self = require('../../../index');
var fs = require('fs');
//var expect = require('chai').expect;

describe('unfoldSurface', function(){
    it('unfolds a box', function(){
        var surface = new self.surface.Surface(self.surface.readSurface(
            fs.readFileSync(__dirname + '/resources/box.surface', {encoding: 'ascii'})));
        var tree = self.tree.readTree(fs.readFileSync(__dirname + '/resources/unfold.tree', {encoding: 'ascii'}));
        var mesh = self.unfoldSurface(surface, tree);
        fs.writeFileSync(__dirname + '/output.obj', self.mesh.writeObj(mesh));
        //expect(tree).to.be.eql(expectedResult);
    });
});
