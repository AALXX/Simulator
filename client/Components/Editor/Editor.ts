import * as THREE from 'three'
import { IEditor } from './Engine/IEngine'
import { IMessageHandler } from './Engine/MessageManager/IMessageHandler'
import { Message } from './Engine/MessageManager/Message'

/**
 * Represents an object that holds editor-specific information.
 */
export class Editor implements IEditor, IMessageHandler {
    private raycaster: THREE.Raycaster
    private clickMouse: THREE.Vector2
    private moveMouse: THREE.Vector2
    private draggable: THREE.Object3D

    private sceneRef: THREE.Scene
    private camera: THREE.Camera

    /**
     * on engine start
     */
    public start(scene: THREE.Scene, props?: any): void {
        Message.subscribe('MOUSE_CLICK', this)

        this.raycaster = new THREE.Raycaster()
        this.clickMouse = new THREE.Vector2()
        this.moveMouse = new THREE.Vector2()

        this.sceneRef = scene
        this.camera = props.camera
    }

    /**
     * Called before the main update loop, after updateReady has been called on the engine subsystems.
     * Used for loading the first/initial level, etc.
     */
    public updateReady(scene: THREE.Scene): void {
        // Load the test level. This should be configurable.

        const dirLight = new THREE.DirectionalLight(0xffffff, 1)
        dirLight.position.set(20, 5, 5)
        dirLight.intensity = 4
        const LightGizoms = new THREE.DirectionalLightHelper(dirLight)

        const ambientLight = new THREE.AmbientLight(0xffffff)
        scene.add(dirLight, LightGizoms, ambientLight)
    }

    /**
     * on message function
     * @param {Message} message
     */
    public onMessage(message: Message): void {
        switch (message.code) {
            case 'MOUSE_CLICK':
                if (this.draggable) {
                    console.log('dropping draggable')
                    this.draggable = null as any
                    return
                }

                this.moveMouse.x = (message.event.clientX / window.innerWidth) * 2 - 1
                this.moveMouse.y = -(message.event.clientY / window.innerHeight) * 2 + 1

                this.raycaster.setFromCamera(this.clickMouse, this.camera)
                const found = this.raycaster.intersectObjects(this.sceneRef.children)
                if (found.length > 0 && found[0].object.userData.draggable) {
                    this.draggable = found[0].object
                    console.log('CUm')
                }
                break
        }
    }

    /**
     * Performs update procedures on this editor. Called after all engine subsystems have updated.
     * @param {number} time The delta time in milliseconds since the last update.
     */
    public update(time: number): void {}

    /**
     * Renders this editor . Called after all engine subsystems have rendered.
     */
    public render(): void {}
}
