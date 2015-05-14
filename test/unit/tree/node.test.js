var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function simpleTree(){
    return new self.Tree(self.tree.readTree(
        util.asciiResource('simple.tree')));
}

describe('tree Node', function(){
    it('has an id', function(){
        expect(simpleTree().getNode(3).id).to.be.eql(3);
        expect(simpleTree().getNode(6).id).to.be.eql(6);
        expect(simpleTree().getNode(7).id).to.be.eql(7);
    });

    it('has a value', function(){
        expect(simpleTree().getNode(1).value).to.be.eql('two');
        expect(simpleTree().getNode(3).value).to.be.eql('four');
        expect(simpleTree().getNode(4).value).to.be.eql('five');
    });

    it('has children', function(){
        expect(simpleTree().getNode(3).children)
            .contains({
                node: 7,
                edge: 6
            })
            .contains({
                node: 6,
                edge: 5
            })
            .contains({
                node: 8,
                edge: 7
            });
    });
});
