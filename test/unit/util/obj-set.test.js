// jshint -W030
var ObjSet = require('../../../lib/util/obj-set');
var expect = require('chai').expect;


describe('ObjSet', function(){
    it('can be empty', function(){
        expect(new ObjSet().elements).to.be.eql([]);
        expect(new ObjSet([]).elements).to.be.eql([]);
    });

    it('can handle numbers', function(){
        var numberSet = new ObjSet([3, 12, 99]);
        expect(numberSet.has(3)).to.be.true;
        expect(numberSet.has(12)).to.be.true;
        expect(numberSet.has(99)).to.be.true;
        expect(numberSet.has(71)).to.be.false;
        expect(numberSet.has(7)).to.be.false;
        expect(numberSet.has(null)).to.be.false;
        expect(numberSet.has(undefined)).to.be.false;

        numberSet.add(71);
        expect(numberSet.has(3)).to.be.true;
        expect(numberSet.has(12)).to.be.true;
        expect(numberSet.has(99)).to.be.true;
        expect(numberSet.has(71)).to.be.true;
        expect(numberSet.has(7)).to.be.false;
        expect(numberSet.has(null)).to.be.false;
        expect(numberSet.has(undefined)).to.be.false;

        expect(numberSet.elements).to.have.all.members([3, 12, 71, 99]);
    });

    it('can handle strings', function(){
        var numberSet = new ObjSet(['bla', 'foo']);
        expect(numberSet.has('bla')).to.be.true;
        expect(numberSet.has('foo')).to.be.true;
        expect(numberSet.has('batman')).to.be.false;
        expect(numberSet.has('bill')).to.be.false;
        expect(numberSet.has(null)).to.be.false;
        expect(numberSet.has(undefined)).to.be.false;

        numberSet.add('bill');
        expect(numberSet.has('bla')).to.be.true;
        expect(numberSet.has('foo')).to.be.true;
        expect(numberSet.has('batman')).to.be.false;
        expect(numberSet.has('bill')).to.be.true;
        expect(numberSet.has(null)).to.be.false;
        expect(numberSet.has(undefined)).to.be.false;

        expect(numberSet.elements).to.have.all.members(['bla', 'bill', 'foo']);
    });

    it('supports a custom hash function', function(){
        var edgeHash = function(edge){
            return edge[0] + '|' + edge[1];
        };
        var edgeSet = new ObjSet([[0, 1], [4, 5]], edgeHash);
        expect(edgeSet.has([0, 1])).to.be.true;
        expect(edgeSet.hasKey('0|1')).to.be.true;
        expect(edgeSet.has([4, 5])).to.be.true;
        expect(edgeSet.hasKey('4|5')).to.be.true;
        expect(edgeSet.has([6, 19])).to.be.false;
        expect(edgeSet.hasKey('6|19')).to.be.false;
        expect(edgeSet.has([3, 9])).to.be.false;
        expect(edgeSet.hasKey('3|9')).to.be.false;

        edgeSet.add([3, 9]);
        expect(edgeSet.has([0, 1])).to.be.true;
        expect(edgeSet.hasKey('0|1')).to.be.true;
        expect(edgeSet.has([4, 5])).to.be.true;
        expect(edgeSet.hasKey('4|5')).to.be.true;
        expect(edgeSet.has([6, 19])).to.be.false;
        expect(edgeSet.hasKey('6|19')).to.be.false;
        expect(edgeSet.has([3, 9])).to.be.true;
        expect(edgeSet.hasKey('3|9')).to.be.true;

        expect(edgeSet.elements).to.have.deep.all.members([[0, 1], [4, 5], [3, 9]]);
    });

    it('has a size', function(){
        var emptyObjSet = new ObjSet();
        expect(emptyObjSet.size).to.be.eql(0);

        var numberSet = new ObjSet([3, 12, 99]);
        expect(numberSet.size).to.be.eql(3);

        numberSet.add(71);
        expect(numberSet.size).to.be.eql(4);
    });
});
