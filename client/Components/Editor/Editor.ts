import * as THREE from 'three'
import { IEditor } from './Engine/IEngine'
import { IMessageHandler } from './Engine/MessageManager/IMessageHandler'
import { Message } from './Engine/MessageManager/Message'

/**
 * Represents an object that holds editor-specific information.
 */
export class Editor implements IEditor {
    /**
     * on engine start
     */
    public start(scene: THREE.Scene, props?: any): void {}

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
     * Performs update procedures on this editor. Called after all engine subsystems have updated.
     * @param {number} time The delta time in milliseconds since the last update.
     */
    public update(time: number): void {}

    /**
     * Renders this editor . Called after all engine subsystems have rendered.
     */
    public render(): void {}
}
