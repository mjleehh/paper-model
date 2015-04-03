var fs = require('fs');


module.exports = function(dirname){
    var RESOURCES_DIR = dirname + '/resources/';
    return {
        asciiResource: function(name){
            return fs.readFileSync(RESOURCES_DIR + name, {encoding: 'ascii'});
        },
        jsonResource: function(name){
            return JSON.parse(fs.readFileSync(RESOURCES_DIR + name, {encoding: 'ascii'}));
        },
        dump: function(filename, buffer){
            fs.writeFileSync(dirname + '/' + filename, buffer);
        }
    };
};