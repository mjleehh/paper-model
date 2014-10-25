import meshLib = require('./mesh-lib')
import topologyLib = require('./topology-lib')


export = createTopology;

function createTopology(mesh:meshLib.Mesh,
                        onSuccess:(topology: topologyLib.Topology) => void,
                        onError:(msg:string) => void)
{
    new HalfEdgeMeshBuilder().buildTopology(mesh, onSuccess, onError);
}

// module private

class HalfEdgeMeshBuilder {

    buildTopology(mesh:meshLib.Mesh,
                   onSuccess:(topology:topologyLib.Topology) => void,
                   onError:(msg:string) => void)
    {
        var err;

        if ((err = this.addVertices(mesh)) !== null) {
            onError(err);
            return;
        }

        if ((err = this.addFaces(mesh)) !== null) {
            onError(err);
            return;
        }

        if ((err = this.addIdProvider()) !== null) {
            onError(err);
            return;
        }

        onSuccess(this.assembleTopology());
    }

    // private

    private addVertices(mesh:meshLib.Mesh):string {
        this.m_vertices = mesh.vertices.map((vertex, idx) => {
            return new topologyLib.Vertex(idx, vertex.x, vertex.y, vertex.z);
        });
        return null;
    }

    private addHalfEdgeCycle(face:meshLib.Face, newFace:topologyLib.Face) {
        var prevHalfEdge:topologyLib.Halfedge = null;

        var cycle = face.vertices.map((vertexIdx, idx) => {
            var halfEdge = new topologyLib.Halfedge(this.m_nextAvailableHalfEdgeId++);
            halfEdge.vertex = this.m_vertices[vertexIdx];
            halfEdge.face = newFace;
            if (prevHalfEdge !== null) {
                prevHalfEdge.next = halfEdge;
            }
        });

        // close cycle
        var fstHalfEdge = cycle[0],
            lastHalfEdge = cycle[cycle.length - 1];
        lastHalfEdge.next = fstHalfEdge;

        return cycle;
    }

    private addFaces(mesh:meshLib.Mesh):string {
        this.m_faces = mesh.faces.map((face, idx) => {
            var newFace = new topologyLib.Face(idx);
            newFace.firstHalfEdge = this.addHalfEdgeCycle(face, newFace)[0];
            return newFace;
        });
        return null;
    }

    private addIdProvider():string {
        this.m_idProvider = new IdProviderImpl(this.m_vertices.length, this.m_halfEdges.length, 0);
        return null;
    }

    private assembleTopology():topologyLib.Topology{
        var topology = new topologyLib.Topology();
        topology.vertices = this.m_vertices;
        topology.halfEdges = this.m_halfEdges;
        topology.faces = this.m_faces;
        return topology;
    }

    private m_idProvider:topologyLib.IdProvider;

    private m_halfEdges:Array<topologyLib.Halfedge>;
    private m_nextAvailableHalfEdgeId:number;

    private m_faces:Array<topologyLib.Face>;
    private m_vertices:Array<topologyLib.Vertex>;
}


class IdProviderImpl implements topologyLib.IdProvider {
    constructor(
        private m_nextAvailableVertexId,
        private m_nextAvailableHalfEdgeId,
        private m_nextAvailableFaceId)
    {

    }

    generateVertexId():number {
        return this.m_nextAvailableVertexId++;
    }

    generateHalfEdgeId():number {
        return this.m_nextAvailableHalfEdgeId++;
    }

    generateFaceId():number {
        return this.m_nextAvailableFaceId++;
    }
}