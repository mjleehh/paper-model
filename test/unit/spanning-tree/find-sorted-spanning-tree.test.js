var self = require('../../../index');
var expect = require('chai').expect;
var assert = require('chai').assert;
var util = require('../util')(__dirname);


describe('findSortedSpanningTree', function(){
    it('matches Shioura-Tamura critirion 1', function(){
        // TODO: implement
        assert.fail();
    });

    it('matches Shioura-Tamura critirion 2 a', function(){
        // TODO: implement
        assert.fail();
    });

    it('matches Shioura-Tamura critirion 2 b', function(){
        // TODO: implement
        assert.fail();
    });

    it('matches Shioura-Tamura critirion 3 a', function(){
        // TODO: implement
        assert.fail();
    });

    it('matches Shioura-Tamura critirion 3 b', function(){
        // TODO: implement
        assert.fail();
    });

    it('matches Shioura-Tamura critirion 3 c', function(){
        // TODO: implement
        assert.fail();
    });

    it('converts complex graphs', function(){
        var graph = new self.Graph(
            self.graph.readGraph(
                util.asciiResource('complex.graph')));
        self.spanningTree.findSortedSpanningTree(graph);
    });
});
