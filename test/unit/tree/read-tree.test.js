var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

describe('read-tree', function(){
    it('fails if the tree is empty', function(){
        expect(function(){
            self.readTree('');
        }).to.throw(Error);
    });

    it('reads cyclic graphs', function(){
        var expectedResult = JSON.parse(fs.readFileSync(__dirname + '/resources/simple.json', {encoding: 'ascii'}));
        var buffer = fs.readFileSync(__dirname + '/resources/simple.tree', {encoding: 'ascii'});
        var tree = self.readTree(buffer);
        expect(tree).to.be.eql(expectedResult);
    });
});
