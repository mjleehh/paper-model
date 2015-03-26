var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;


var RESOURCE_FOLDER = __dirname + '/resources/find-fundamental-cut/';

describe('findFundamentalCut', function(){
    it('unfolds a box', function(){
        var graph = new self.graph.Graph(self.graph.readGraph(
            fs.readFileSync(RESOURCE_FOLDER + 'cutable.graph', {encoding: 'ascii'})));
        var spanningTree = new self.tree.Tree(self.tree.readTree(
            fs.readFileSync(RESOURCE_FOLDER + 'spanning.tree', {encoding: 'ascii'})));

        expect(self.graph.findFundamentalCut(graph, spanningTree, 10))
            .to.contain(2)
            .to.contain(10)
            .to.contain(15)
            .to.contain(19);

        expect(self.graph.findFundamentalCut(graph, spanningTree, 9))
            .to.contain(2)
            .to.contain(9)
            .to.contain(14)
            .to.contain(19);

        expect(self.graph.findFundamentalCut(graph, spanningTree, 6))
            .to.contain(2)
            .to.contain(7)
            .to.contain(6);

        expect(self.graph.findFundamentalCut(graph, spanningTree, 21))
            .to.contain(21);
    });
});