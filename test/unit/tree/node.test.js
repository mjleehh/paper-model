var self = require('../../../index');
var fs = require('fs');
var expect = require('chai').expect;

function simpleTree(){
    return new self.tree.Tree(self.tree.readTree(
        fs.readFileSync(__dirname + '/resources/simple.tree', {encoding: 'ascii'})));
}

describe('tree Node', function(){
    it('has an id', function(){
        expect(simpleTree().getNode(7).id).to.be.eql(7);
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
