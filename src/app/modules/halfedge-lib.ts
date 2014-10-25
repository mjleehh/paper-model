class Vertex {
    firstHalfEdge: Halfedge;
}

class Face {
    firstHalfEdge: Halfedge;
}

class Halfedge {
    vertex: Vertex;
    face: Face;
    next: Halfedge;
    twin: Halfedge;
}
