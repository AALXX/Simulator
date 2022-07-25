import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export class ObjectManager {
    /** Private constructor to enforce singleton pattern. */
    private constructor() {}

    /** Loads this manager. */
    public static load(scene: THREE.Scene): void {
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(
            'monke.glb',
            object => {
                scene.add(object.scene)
                object.userData.draggable = true
                object.userData.name = 'BOX'
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
