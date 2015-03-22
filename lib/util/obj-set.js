var _ = require('lodash');


function ObjSet(elements, hashFn){
    if (elements === undefined) {
        elements = [];
    }

    if (hashFn === undefined) {
        hashFn = _.identity;
    }
    var size = 0;
    var data = {};

    _.forEach(elements, function(elem){
        data[hashFn(elem)] = elem;
        ++size;
    });

    this.has = function(elem){
        return data[hashFn(elem)] !== undefined;
    };

    this.hasKey = function(key){
        return data[key] !== undefined;
    };

    this.add = function(elem){
        ++size;
        return data[hashFn(elem)] = elem;
    };

    this.__defineGetter__('size', function(){
        return size;
    });

    this.__defineGetter__('elements', function(){
        return _.values(data);
    });
}
module.exports = ObjSet;