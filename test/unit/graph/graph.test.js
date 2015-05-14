var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function complexGraph(){
    return new self.Graph(self.graph.readGraph(
        util.asciiResource('complex.graph')));
}

describe('Graph', function(){
    it('has a number of nodes', function(){
        expect(complexGraph().numNodes).to.be.eql(6);
    });
});
