import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class MeshManager {
    /** Private constructor to enforce singleton pattern. */
    private constructor() {}

    /** Loads this manager. */
    public static load(scene: THREE.Scene): void {
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            'monke.glb',
            object => {
                // (object.children[0] as THREE.Mesh).material = material
                // object.traverse(function (child) {
                //     if ((child as THREE.Mesh).isMesh) {
                //         (child as THREE.Mesh).material = material
                //     }
                // })
                scene.add(object.scene)
            },
            xhr => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            error => {
                console.log(error)
            }
        )
    }
}
