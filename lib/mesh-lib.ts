/// <reference path="../../../libs/node.d.ts" />
import three = require('three');


export class Mesh {
    constructor(public vertices: three.Vector3[], public faces: Face[]) {

    }
}

export class Face {
    constructor(public vertices: number[] = [], public uvs: number[] = [], public normals: number[] = []) {

    }
}
