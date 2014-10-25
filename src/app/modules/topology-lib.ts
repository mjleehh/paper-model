export = topologyLib;

module topologyLib {

export class Topology {


}

class IdProvider {
    constructor() {
        this.m_nextAvailableHalfEdgeId = 1;
    }

    generateHalfEdgeId():number {
        return this.m_nextAvailableHalfEdgeId++;
    }

    private m_nextAvailableHalfEdgeId;
}

class MeshImpl {

}

export class Vertex {

    constructor(id:number, x:number, y:number, z:number) {
        this.m_id = id;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get id() {
        return this.m_id;
    }

    x:number;
    y:number;
    z:number;
    firstHalfEdge:Halfedge;

    // private

    m_id:number;
}

class Face {
    firstHalfEdge:Halfedge;
}

class Halfedge {
    constructor(id:number) {
        this.m_id = id;
    }

    get id():number {
        return this.m_id;
    }

    vertex:Vertex = null;
    face:Face = null;
    next:Halfedge = null;
    twin:Halfedge = null;

    private m_id;
}

} // module halfEdgeLib
