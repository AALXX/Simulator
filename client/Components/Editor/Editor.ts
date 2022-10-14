import * as THREE from 'three'
import { IEditor } from './Engine/IEngine'
import { LevelManager } from './Engine/Level/Levelmanager'
import { BoxObject } from './Engine/Object/BoxObject'

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
        LevelManager.changeLevel('kw8rybzkj4ova9uyj1')
    }

    /**
     * Performs update procedures on this editor. Called after all engine subsystems have updated.
     * @param {number} time The delta time in milliseconds since the last update.
     */
    public update(time: number): void {}
}
