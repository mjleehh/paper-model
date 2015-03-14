var createMapVertex = require('../../../lib/unfold/create-map-vertex');
var expect = require('chai').expect;

describe('mapVertex', function(){
    it('performs identity mappings', function(){
        var faceEdge = {
            begin: {x: 0, y: 0, z: 0},
            end: {x: 1, y: 0, z: 0},
            face: {
                normal: {x: 0, y: 0, z: 1}
            }
        };
        var mappedBegin = {x: 0, y: 0, z: 0};
        var mappedEnd = {x: 31, y: 0, z: 0};

        var mapVertex = createMapVertex(faceEdge, mappedBegin, mappedEnd);

        var input1 = {x: 0, y: 0, z: 0};
        expect(mapVertex(input1)).to.be.eql(input1);

        var input2 = {x: 1, y: 0, z: 0};
        expect(mapVertex(input2)).to.be.eql(input2);

        var input3 = {x: 0, y: 1, z: 0};
        expect(mapVertex(input3)).to.be.eql(input3);

        var input4 = {x: 2, y: 7, z: 0};
        expect(mapVertex(input4)).to.be.eql(input4);

        var input5 = {x: 23.1, y: 23.4, z: 0};
        expect(mapVertex(input5)).to.be.eql(input5);
    });

    it('performs 90 deg mappings on x-y plane', function(){
        var faceEdge = {
            begin: {x: 0, y: 0, z: 0},
            end: {x: 0, y: 23, z: 0},
            face: {
                normal: {x: 0, y: 0, z: 1}
            }
        };
        var mappedBegin = {x: 0, y: 0, z: 0};
        var mappedEnd = {x: -7, y: 0, z: 0};

        var mapVertex = createMapVertex(faceEdge, mappedBegin, mappedEnd);

        var input1 = {x: 0, y: 0, z: 0};
        expect(mapVertex(input1)).to.be.eql(input1);
        expect(mapVertex({x: 1, y: 0, z: 0})).to.be.eql({x: 0, y: 1, z: 0});
        expect(mapVertex({x: 1, y: 1, z: 0})).to.be.eql({x: -1, y: 1, z: 0});
        expect(mapVertex({x: 2, y: 7, z: 0})).to.be.eql({x: -7, y: 2, z: 0});
    });

    it('performs projecting down mappings', function(){
        var faceEdge = {
            begin: {x: 0, y: 0, z: 3},
            end: {x: 15, y: 0, z: 3},
            face: {
                normal: {x: 0, y: 0, z: 1}
            }
        };
        var mappedBegin = {x: 0, y: 0, z: 0};
        var mappedEnd = {x: 99, y: 0, z: 0};

        var mapVertex = createMapVertex(faceEdge, mappedBegin, mappedEnd);

        expect(mapVertex({x: 0, y: 0, z: 3})).to.be.eql({x: 0, y: 0, z: 0});
        expect(mapVertex({x: 1, y: 0, z: 3})).to.be.eql({x: 1, y: 0, z: 0});
        expect(mapVertex({x: 1, y: 1, z: 3})).to.be.eql({x: 1, y: 1, z: 0});
        expect(mapVertex({x: 2, y: 7, z: 3})).to.be.eql({x: 2, y: 7, z: 0});
    });


    it('performs rotation mappings in free space', function(){
        var faceEdge = {
            begin: {x: 0, y: 0, z: 0},
            end: {x: 0, y: 0, z: 5},
            face: {
                normal: {x: 1, y: 0, z: 0}
            }
        };
        var mappedBegin = {x: 0, y: 0, z: 0};
        var mappedEnd = {x: 0, y: -11, z: 0};

        var mapVertex = createMapVertex(faceEdge, mappedBegin, mappedEnd);

        expect(mapVertex({x: 0, y: 0, z: 0})).to.be.eql({x: 0, y: 0, z: 0});
        expect(mapVertex({x: 0, y: 2, z: 0})).to.be.eql({x: -2, y: 0, z: 0});
        expect(mapVertex({x: 0, y: 0, z: 55})).to.be.eql({x: 0, y: -55, z: 0});
        expect(mapVertex({x: 0, y: 7, z: 3})).to.be.eql({x: -7, y: -3, z: 0});
    });


    it('performs translational mappings', function(){
        var faceEdge = {
            begin: {x: 2, y: 3, z: 0},
            end: {x: 6, y: 3, z: 0},
            face: {
                normal: {x: 0, y: 0, z: 1}
            }
        };
        var mappedBegin = {x: 3, y: 1, z: 0};
        var mappedEnd = {x: 4, y: 1, z: 0};

        var mapVertex = createMapVertex(faceEdge, mappedBegin, mappedEnd);

        expect(mapVertex({x: 2, y: 3, z: 0})).to.be.eql({x: 3, y: 1, z: 0});
        expect(mapVertex({x: 4, y: 3, z: 0})).to.be.eql({x: 5, y: 1, z: 0});
        expect(mapVertex({x: 2, y: 70, z: 0})).to.be.eql({x: 3, y: 68, z: 0});
        expect(mapVertex({x: 0, y: 7, z: 0})).to.be.eql({x: 1, y: 5, z: 0});
    });
});
