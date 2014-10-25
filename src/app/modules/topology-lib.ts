export = topologyLib;

module topologyLib {

export class Topology {
    vertices:Array<Vertex>;
    halfEdges:Array<Halfedge>;
    faces:Array<Face>;
}

export interface IdProvider {
    generateVertexId():number;
    generateHalfEdgeId():number;
    generateFaceId():number;
}

export class Vertex {

    constructor(id:number, x:number, y:number, z:number) {
        this.m_id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.firstHalfEdge = null;
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

export export class Face {
    constructor(id:number) {
        this.m_id = id;
    }

    get id():number {
        return this.m_id;
    }

    firstHalfEdge:Halfedge = null;

    // private
    private m_id;
}

export class Halfedge {
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
