import * as THREE from 'three'
import { IEditor } from './Engine/IEngine'

/**
 * Represents an object that holds editor-specific information.
 */
export class Editor implements IEditor {
    private torus: THREE.Mesh
    /**
     * on engine start
     */
    public start(scene: THREE.Scene): void {}

    /**
     * Called before the main update loop, after updateReady has been called on the engine subsystems.
     * Used for loading the first/initial level, etc.
     */
    public updateReady(scene: THREE.Scene): void {
        // Load the test level. This should be configurable.

        const pointLight = new THREE.PointLight(0xffffff)
        pointLight.position.set(10, 5, 5)
        pointLight.intensity = 4
        const ambientLight = new THREE.AmbientLight(0xffffff)
        scene.add(pointLight, ambientLight)
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
