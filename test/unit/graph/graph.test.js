var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

function complexGraph(){
    return new self.graph.Graph(self.graph.readGraph(
        fs.readFileSync(__dirname + '/resources/complex.graph', {encoding: 'ascii'})));
}

describe('Graph', function(){
    it('has a number of nodes', function(){
        expect(complexGraph().numNodes).to.be.eql(6);
    });
});
