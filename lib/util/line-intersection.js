//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
var Vec2 = require('vecks').Vec2;


function calculateParams(v1, v2, w1, w2){
    var mu = v2.sub(v1);
    if (mu.length() === 0) {
        throw new Error('zero length line');
    }
    var nu = w2.sub(w1);
    if (nu.length() === 0) {
        throw new Error('zero length line');
    }
    var eta = v1.sub(w1);

    //console.log('mu', mu.x, mu.y);
    //console.log('nu', nu.x, nu.y);
    //console.log('eta', eta.x, eta.y);

    var a_alpha = nu.y * eta.x - nu.x * eta.y;
    var a_beta = mu.y * eta.x - mu.x * eta.y;
    var b = nu.x * mu.y - nu.y * mu.x;

    if (b === 0) {
        // parallel
        //if (a_alpha === 0) {
           // in one line
           // what about mu_x === 0 or nu_x === 0
        //}
        // lines are parallel but do not intersect
        return null;
    }

    return {
        alpha: a_alpha / b,
        beta: a_beta / b
    };
}

function isIntersectionOnBothLines(params){
    return params.alpha >= 0 && params.alpha <= 1 && params.beta >= 0 && params.beta <= 1;
}

function doLinesIntersect(v1, v2, w1, w2){
    var params = calculateParams(new Vec2(v1), new Vec2(v2), new Vec2(w1), new Vec2(w2));
    return params !== null && isIntersectionOnBothLines(params);
}
exports.doLinesIntersect = doLinesIntersect;

function intersection(v1, v2, w1, w2){
    var _v1 = new Vec2(v1);
    var _v2 = new Vec2(v2);
    var params = calculateParams(_v1, _v2, new Vec2(w1), new Vec2(w2));
    if (params === null || !isIntersectionOnBothLines(params)) {
        return null;
    }
    return _v2.sub(_v1).multiply(params.alpha).add(_v1);
}
exports.intersection = intersection;