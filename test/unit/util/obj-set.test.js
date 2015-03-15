// jshint -W030
var ObjSet = require('../../../lib/util/obj-set');
var expect = require('chai').expect;
var assert = require('chai').assert;

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
        assert(false, 'implement test');
    });
});