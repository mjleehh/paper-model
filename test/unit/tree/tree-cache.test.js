var self = require('../../../index');
var TreeCache = require('../../../lib/tree/tree-cache');
var _ = require('lodash');
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

describe('TreeCache', function(){
    it('returns all edges as tree edges for tree graphs', function(){
        var treeCache = new TreeCache(simpleTree());
        expect(_.sortBy(treeCache.getTreeEdges())).to.be.eql([0, 1, 2, 3, 4, 5, 6, 7]);
    });

    it('returns no edges as non tree edges for tree graphs', function(){
        var treeCache = new TreeCache(simpleTree());
        expect(treeCache.getNonTreeEdges()).to.be.eql([]);
    });

    it('returns tree and non tree edges for non tree graphs', function(){
        var treeCache = new TreeCache(subgraphTree());
        expect(_.sortBy(treeCache.getTreeEdges())).to.be.eql([0, 2, 3, 4, 8]);
        expect(treeCache.getNonTreeEdges()).to.be.eql([1, 5, 6, 7]);
    });

    it('tree edges in depth first order', function(){
        var treeCache = new TreeCache(subgraphTree());
        expect(treeCache.getTreeEdges()).to.be.eql([3, 8, 0, 4, 2]);
    });

    it('returns disjunct sets for tree and non tree edges', function(){
        var treeCache = new TreeCache(subgraphTree());
        expect(_.intersection(treeCache.getTreeEdges(), treeCache.getNonTreeEdges()))
            .to.be.eql([]);
    });

    it('returns separates the entire edge set into two disjunct non tree and tree edge lists', function(){
        var treeCache = new TreeCache(subgraphTree());
        expect(_.sortBy(
            _.union(treeCache.getTreeEdges(), treeCache.getNonTreeEdges())
        )).to.be.eql([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });
});
