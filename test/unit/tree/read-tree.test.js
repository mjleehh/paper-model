var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('readTree', function(){
    it('fails if the tree is empty', function(){
        expect(function(){
            self.tree.readTree('');
        }).to.throw(Error);
    });

    it('reads simple trees', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/simple.json', {encoding: 'ascii'}));
        var buffer = fs.readFileSync(__dirname + '/resources/simple.tree', {encoding: 'ascii'});
        var tree = self.tree.readTree(buffer);
        expect(tree).to.be.eql(expectedResult);
    });
});
