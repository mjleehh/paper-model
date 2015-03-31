var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function simpleTree(){
    return new self.tree.Tree(self.tree.readTree(
        util.asciiResource('simple.tree')));
}

describe('Tree', function(){
    it('has a root node', function(){
        expect(simpleTree().rootNode.id).to.be.eql(0);
    });

    it('has a number of nodes', function(){
        expect(simpleTree().numNodes).to.be.eql(9);
    });

    it('has single nodes', function(){
        expect(simpleTree().getNode(0).id).to.be.eql(0);
        expect(simpleTree().getNode(5).id).to.be.eql(5);
        expect(simpleTree().getNode(8).id).to.be.eql(8);
    });
});
