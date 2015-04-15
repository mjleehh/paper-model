var self = require('../../../index');
var expect = require('chai').expect;
var util = require('../util')(__dirname);


describe('traverseTree', function(){
    it('traverses all nodes in depth first order', function(){
        var expectedResult = ['one', 'two', 'five', 'six', 'three', 'four', 'seven', 'eight', 'nine'];
        var tree = new self.tree.Tree(
                self.tree.readTree(
                    util.asciiResource('simple.tree')));

        var list = [];
        self.tree.forEach(tree, function(node){
            list.push(node.value);
        });

        expect(list).to.be.eql(expectedResult);
    });

    it('can be stopped', function(){
        var expectedResult = ['one', 'two'];
        var tree = new self.tree.Tree(
            self.tree.readTree(
                util.asciiResource('simple.tree')));

        var list = [];
        self.tree.forEach(tree, function(node){
            var value = node.value;
            list.push(value);
            if (value === 'two') {
                self.tree.forEach.stop();
            }
        });

        expect(list).to.be.eql(expectedResult);
    });

    it('can be stopped for every subtree', function(){
        var expectedResult = ['one', 'two', 'three', 'four', 'seven', 'eight', 'nine'];
        var tree = new self.tree.Tree(
            self.tree.readTree(
                util.asciiResource('simple.tree')));

        var list = [];
        self.tree.forEach(tree, function(node){
            var value = node.value;
            list.push(value);
            if (value === 'two') {
                self.tree.forEach.stopSubtree();
            }
        });

        expect(list).to.be.eql(expectedResult);
    });
});
