var self = require('../../index');
var fs = require('fs');

describe('read-obj', function(){
    it('reads an empty file', function(){
        console.log(self.readObj(''));
    });

    it('reads a file', function(){
        var buffer = fs.readFileSync(__dirname + '/resources/models/box.obj', {encoding: 'ascii'});
        console.log(self.readObj(buffer));
    });
});