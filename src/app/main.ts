/// <reference path="../../libs/node.d.ts" />

import fs = require('fs');
import readObj = require('./modules/read-obj');
import halfedge = require('./modules/halfedge')

fs.readFile('src/resources/models/box.obj', {encoding: 'ascii'}, function(err, data) {
    if (err) {
        throw err;
    }

    var mesh = readObj.readObj(data);
    console.log(mesh.vertices)
    console.log(mesh.faces)
    console.log('//////////////////////////////')
    halfedge.create(mesh);
});
