var converters = require('../../index').converters;
var expect = require('chai').expect;

describe('converters', function(){
    it('fails if the graph is empty', function(){
        expect(function(){
            var graph = {
                nodes: []
            };
            converters.findSpanningTree(graph);
        }).to.throw(Error);
    });

    it('converts trivial graphs', function(){
        var graph = {
            nodes: [{
                value: 'one',
                neighbours: []
            }]
        };
        var tree = converters.findSpanningTree(graph);
        expect(tree).to.be.eql({
            value: 'one',
            children: []
        });
    });

    it('converts cyclic graphs', function(){
        var one = {
            value: 'one',
            neighbours: []
        };
        var two = {
            value: 'two',
            neighbours: []
        };
        var three = {
            value: 'three',
            neighbours: []
        };
        one.neighbours.push(two);
        two.neighbours.push(one);
        two.neighbours.push(three);
        three.neighbours.push(two);
        three.neighbours.push(one);
        one.neighbours.push(three);

        var graph = {
            nodes: [one, two, three]
        };
        var tree = converters.findSpanningTree(graph);
        expect(tree).to.be.eql({
            value: 'one',
            children: [{
                value: 'two',
                children: [{
                    value: 'three',
                    children: []
                }]
            }]
        });
    });
});