import * as THREE from 'three'
import { InputManager, Keys } from '../Input/InputManager'
import { IMessageHandler } from '../MessageManager/IMessageHandler'
import { Message } from '../MessageManager/Message'

export class BoxObject implements IMessageHandler {
    private _isSelected: boolean = false
    private box: THREE.Mesh

    private SelectObjectEvent: CustomEvent

    /** Private constructor to enforce singleton pattern. */
    public constructor() {}
    onMessage(message: Message): void {}

    /** Loads this manager. */
    public load(scene: THREE.Scene): void {
        let scale = { x: 6, y: 6, z: 6 }

        this.box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0x00ff00 }))
        this.box.scale.set(scale.x, scale.y, scale.z)

        scene.add(this.box)

        Message.subscribe('SELECT_OBJECT', this)
        Message.subscribe('DESELECT_OBJECT', this)

        this.box.userData.selectable = true
        this.box.userData.name = 'BOX'

        this.SelectObjectEvent = new CustomEvent('SelectObject', {
            detail: {
                name: this.box.userData.name
            }
        })
    }

    public update(): void {}
}
