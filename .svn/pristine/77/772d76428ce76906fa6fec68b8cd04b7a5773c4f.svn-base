import * as THREE from 'three'

export class BoxObject {
    /** Private constructor to enforce singleton pattern. */
    private constructor() {}

    /** Loads this manager. */
    public static load(scene: THREE.Scene): void {
        let scale = { x: 6, y: 6, z: 6 }
        let pos = { x: 15, y: scale.y / 2, z: 2 }

        let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xdc143c }))
        // box.position.set(pos.x, pos.y, pos.z)
        box.scale.set(scale.x, scale.y, scale.z)

        scene.add(box)

        box.userData.draggable = true
        box.userData.name = 'BOX'
    }
}
