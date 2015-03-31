var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


function complexGraph(){
    return new self.graph.Graph(self.graph.readGraph(
        util.asciiResource('complex.graph')));
}

describe('graph Node', function(){
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
