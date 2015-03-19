// jshint -W030
var lineIntersection = require('../../../index').algorithms.lines;
var expect = require('chai').expect;


describe('line intersection', function(){
    it('fails on invalid lines', function(){
        var v1 = {
            x: 1,
            y: 7
        };
        var v2 = {
            x: 12,
            y: 9
        };
        var v3 = {
            x: 66,
            y: 2
        };
        expect(function(){
            lineIntersection.doLinesIntersect(v1, v1, v2, v3);
        }).to.throw(Error);
        expect(function(){
            lineIntersection.doLinesIntersect(v1, v2, v3, v3);
        }).to.throw(Error);
    });

    it('detects normal intersecting lines', function(){
        var v1 = {
            x: 0,
            y: 2
        };
        var v2 = {
            x: 3,
            y: 1
        };
        var w1 = {
            x: 1,
            y: 1
        };
        var w2 = {
            x: 2,
            y: 3
        };
        expect(lineIntersection.doLinesIntersect(v1, v2, w1, w2)).to.be.true;
        expect(lineIntersection.doLinesIntersect(w1, w2, v1, v2)).to.be.true;
        var u1 = {
            x: 2,
            y: 2
        };
        var u2 = {
            x: 4,
            y: 3
        };
        expect(lineIntersection.doLinesIntersect(v1, v2, u1, u2)).to.be.false;
        expect(lineIntersection.doLinesIntersect(u1, u2, v1, v2)).to.be.false;
        expect(lineIntersection.doLinesIntersect(w1, w2, u1, u2)).to.be.false;
        expect(lineIntersection.doLinesIntersect(u1, u2, w1, w2)).to.be.false;
    });

    it('always treats parallel lines as non intersecting', function(){
        var v1 = {
            x: 1,
            y: 1
        };
        var v2 = {
            x: 7,
            y: 4
        };

        // line parallel and not overlapping v
        var w1 = {
            x: 2,
            y: 3
        };
        var w2 = {
            x: 6,
            y: 5
        };
        expect(lineIntersection.doLinesIntersect(v1, v2, w1, w2)).to.be.false;
        expect(lineIntersection.doLinesIntersect(w1, w2, v1, v2)).to.be.false;
        expect(lineIntersection.intersection(v1, v2, w1, w2)).to.be.null;
        expect(lineIntersection.intersection(w1, w2, v1, v2)).to.be.null;

        // line parallel but overlapping v
        var u1 = {
            x: 3,
            y: 2
        };
        var u2 = {
            x: 5,
            y: 3
        };
        expect(lineIntersection.doLinesIntersect(v1, v2, u1, u2)).to.be.false;
        expect(lineIntersection.doLinesIntersect(u1, u2, v1, v2)).to.be.false;
        expect(lineIntersection.intersection(v1, v2, u1, u2)).to.be.null;
        expect(lineIntersection.intersection(u1, u2, v1, v2)).to.be.null;

        // line parallel and in the path of v but not overlapping
        var u3 = {
            x: 9,
            y: 5
        };
        var u4 = {
            x: 13,
            y: 7
        };
        expect(lineIntersection.doLinesIntersect(v1, v2, u3, u4)).to.be.false;
        expect(lineIntersection.doLinesIntersect(u3, u4, v1, v2)).to.be.false;
        expect(lineIntersection.intersection(v1, v2, u3, u4)).to.be.null;
        expect(lineIntersection.intersection(u3, u4, v1, v2)).to.be.null;
    });

    it('can calculate intersection points', function(){
        var v1 = {
            x: 1,
            y: 1
        };
        var v2 = {
            x: 3,
            y: 3
        };

        // w intersects v
        var w1 = {
            x: 3,
            y: 0
        };
        var w2 = {
            x: 0,
            y: 6
        };

        var intersection1 = lineIntersection.intersection(v1, v2, w1, w2);
        expect(intersection1).to.have.property('x', 2);
        expect(intersection1).to.have.property('y', 2);

        var intersection2 = lineIntersection.intersection(v1, v2, w1, w2);
        expect(intersection2).to.have.property('x', 2);
        expect(intersection2).to.have.property('y', 2);

        // u does not intersect v
        var u1 = {
            x: 2,
            y: 3
        };
        var u2 = {
            x: 3,
            y: 8
        };
        expect(lineIntersection.intersection(v1, v2, u1, u2)).to.be.null;
        expect(lineIntersection.intersection(u1, u2, v1, v2)).to.be.null;
    });
});