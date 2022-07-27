import * as THREE from 'three'
import { InputManager, Keys } from '../Input/InputManager'
import { IMessageHandler } from '../MessageManager/IMessageHandler'
import { Message } from '../MessageManager/Message'

export class BoxObject implements IMessageHandler {
    private _isSelected: boolean = false

    /** Private constructor to enforce singleton pattern. */
    public constructor() {}

    /** Loads this manager. */
    public load(scene: THREE.Scene): void {
        let scale = { x: 6, y: 6, z: 6 }

        let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xdc143c }))
        // box.position.set(pos.x, pos.y, pos.z)
        box.scale.set(scale.x, scale.y, scale.z)

        scene.add(box)

        Message.subscribe('SELECT_OBJECT', this)
        Message.subscribe('DESELECT_OBJECT', this)

        box.userData.selectable = true
        box.userData.name = 'BOX'
    }

    onMessage(message: Message): void {
        switch (message.code) {
            case 'SELECT_OBJECT':
                this._isSelected = true
                break
            case 'DESELECT_OBJECT':
                this._isSelected = false
                break
        }
    }

    public update(): void {
        if (this._isSelected && InputManager.isKeyDown(Keys.G_KEY)) {
            const SelectObjectEvent: CustomEvent = new CustomEvent('DragObject')
            window.dispatchEvent(SelectObjectEvent) //dispatch the select scene object event
        }
    }
}
