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
        var err = null;

        if ((err = this.addVertices(mesh)) !== null) {
            onError(err);
            return;
        }
    }

    // private

    private addVertices(mesh:meshLib.Mesh) {
        this.m_vertices = mesh.vertices.map((vertex, idx) => {
            return new topologyLib.Vertex(idx, vertex.x, vertex.y, vertex.z);
        });
        this.m_nextAvailableVertexId = mesh.vertices.length;
        return null;
    }

    private m_vertices;
    private m_nextAvailableVertexId: number;
}
