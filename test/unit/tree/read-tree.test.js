var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('readTree', function(){
    it('fails if the tree is empty', function(){
        expect(function(){
            self.tree.readTree('');
        }).to.throw(Error);
    });

    it('fails if there is no root node', function(){
        expect(function(){
            self.tree.readTree(
                util.asciiResource('simple-with-missing-root-node.tree'));
        }).to.throw(Error);
    });

    it('reads simple trees', function(){
        var expectedResult = util.jsonResource('simple.json');
        var tree = self.tree.readTree(
            util.asciiResource('simple.tree'));
        expect(tree).to.be.eql(expectedResult);
    });
});
