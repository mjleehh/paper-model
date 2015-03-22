var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

function complexGraph(){
    return new self.graph.Graph(self.graph.readGraph(
        fs.readFileSync(__dirname + '/resources/complex.graph', {encoding: 'ascii'})));
}

describe('Node', function(){
    it('has a value', function(){
        expect(complexGraph().getNode(2).value).to.be.eql('three');
        expect(complexGraph().getNode(5).value).to.be.eql('six');
        expect(complexGraph().getNode(0).value).to.be.eql('one');
    });

    it('has neighbours', function(){
        expect(complexGraph().getNode(1).neighbours)
            .contains({
                node: 0,
                edge: 0
            })
            .contains({
                node: 2,
                edge: 3
            })
            .contains({
                node: 3,
                edge: 1
            })
            .contains({
                node: 4,
                edge: 8
            });
    });
});
