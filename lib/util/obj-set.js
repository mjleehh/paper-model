var _ = require('lodash');


function ObjSet(elements, hashFn){
    if (elements === undefined) {
        elements = [];
    }

    if (hashFn === undefined) {
        hashFn = _.identity;
    }
    var data = {};

    _.forEach(elements, function(elem){
        data[hashFn(elem)] = elem;
    });

    this.has = function(elem){
        return data[hashFn(elem)] !== undefined;
    };

    this.hasKey = function(key){
        return data[key] !== undefined;
    };

    this.add = function(elem){
        return data[hashFn(elem)] = elem;
    };

    this.__defineGetter__('elements', function(){
        return _.values(data);
    });
}
module.exports = ObjSet;