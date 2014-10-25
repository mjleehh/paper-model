export = halfEdgeLib;

module halfEdgeLib {

class IdProvider {
    constructor() {
        this.m_nextUnusedHalfEdgeId = 1;
    }

    generateHalfEdgeId():number {
        return this.m_nextUnusedHalfEdgeId++;
    }

    private m_nextUnusedHalfEdgeId;
}

class MeshImpl {

}

class Vertex {
    firstHalfEdge:Halfedge;
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
