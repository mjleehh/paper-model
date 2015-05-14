var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function simpleTree(){
    return new self.Tree(self.tree.readTree(
        util.asciiResource('simple.tree')));
}

function subgraphTree(){
    return new self.Tree(self.tree.readTree(
        util.asciiResource('subgraph.tree')));
}

describe('Tree', function(){
    it('has a root node', function(){
        expect(simpleTree().rootNode.id).to.be.eql(0);
        expect(subgraphTree().rootNode.id).to.be.eql(2);
    });

    it('has a number of nodes', function(){
        expect(simpleTree().numNodes).to.be.eql(9);
        expect(subgraphTree().numNodes).to.be.eql(6);
    });

    it('has single nodes', function(){
        expect(simpleTree().getNode(0).id).to.be.eql(0);
        expect(simpleTree().getNode(5).id).to.be.eql(5);
        expect(simpleTree().getNode(8).id).to.be.eql(8);

        expect(subgraphTree().getNode(3).id).to.be.eql(3);
        expect(subgraphTree().getNode(5).id).to.be.eql(5);
    });

    it('has tree edges', function(){
        expect(simpleTree().treeEdges)
            .contains(0)
            .contains(1)
            .contains(2)
            .contains(3)
            .contains(4)
            .contains(5)
            .contains(6)
            .contains(7);

        expect(subgraphTree().treeEdges)
            .contains(0)
            .contains(2)
            .contains(3)
            .contains(4)
            .contains(8);
    });

    it('has non tree edges', function(){
        expect(simpleTree().nonTreeEdges).to.be.eql([]);

        expect(subgraphTree().nonTreeEdges)
            .contains(1)
            .contains(5)
            .contains(6)
            .contains(7);
    });
});
