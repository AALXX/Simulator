import { ComponentManager } from '../ObjectComponents/ComponentsManager'
import { Dictionary } from '../Types'
import { EditorEntity } from './EditorEntity'
import { EntitiManager } from './EntityManager'

/* eslint-disable */

/**
 * Represents the basic level state.
 */
export enum LevelState {
    /** The level is not yet initialized. */
    UNINITIALIZED,

    /** The level is currently loading. */
    LOADING,

    /** The level is loaded and is currently updating. */
    UPDATING
}
/* eslint-enable */

/**
 * Represents a single level in the world. Levels are loaded and unloaded as the player
 * progresses through the game. An open world would be achieved by overriding this class
 * and adding/removing objects dynamically based on player position, etc.
 */
export class Level {
    private _name: string
    private _description: string
    private _state: LevelState = LevelState.UNINITIALIZED
    private _scene: THREE.Scene

    /**
     * Creates a new level.
     * @param {string} name The name of this level.
     * @param {string} description A brief description of this level.
     * Could be used on level selection screens for some games.
     */
    public constructor(name: string, description: string, scene: THREE.Scene) {
        this._name = name
        this._description = description
        this._scene = scene
    }

    /** The name of this level. */
    public get name(): string {
        return this._name
    }

    /** The description of this level. */
    public get description(): string {
        return this._description
    }

    /** Indicates if this level is loaded. */
    public get isLoaded(): boolean {
        return this._state === LevelState.UPDATING
    }

    /**
     * Performs initialization routines on this level.
     * @param {any} jsonData The JSON-formatted data to initialize this level with.
     */
    public initialize(jsonData: any): void {
        if (jsonData.ProjectData.objects === undefined) {
            throw new Error('project initialization error: objects not present.')
        }

        for (const o in jsonData.ProjectData.objects) {
            if (o !== undefined) {
                const obj = jsonData.ProjectData.objects[o]
                this.loadEntity(obj, null)
            }
        }
    }

    /** Loads this level. */
    public load(): void {
        this._state = LevelState.LOADING

        EntitiManager.load()

        this._state = LevelState.UPDATING
    }

    /** Unloads this level. */
    public unload(): void {}

    /**
     * Updates this level.
     * @param {number} time The delta time in milliseconds since the last update.
     */
    public update(time: number): void {
        if (this._state === LevelState.UPDATING) {
            EntitiManager.update(time)
        }
    }

    /** Called when this level is activated. */
    public onActivated(): void {}

    /** Called when this level is deactivated. */
    public onDeactivated(): void {}

    /**
     * Loads an ertity using the data section provided. Attaches to the provided parent.
     * @param {any} dataSection The data section to load from.
     * @param {EditorEntity} parent The parent object to attach to.
     */
    private loadEntity(dataSection: any, parent: EditorEntity): void {
        let name: string
        if (dataSection.name !== undefined) {
            name = String(dataSection.name)
        }

        let entity: EditorEntity

        // TODO: Use factories
        entity = new EditorEntity(name, this._scene, dataSection)
        EntitiManager.addEntity(entity)

        if (dataSection.transform !== undefined) {
            // entity.transform.setFromJson(dataSection.transform)
        }

        // if (dataSection.components !== undefined) {
        //     for (const c in dataSection.components) {
        //         if (c !== undefined) {
        //             const data = dataSection.components[c]
        //             const component = ComponentManager.extractComponent(data)
        //             entity.addComponent(component)
        //         }
        //     }
        // }

        if (dataSection.children !== undefined) {
            for (const o in dataSection.children) {
                if (o !== undefined) {
                    const obj = dataSection.children[o]
                    this.loadEntity(obj, entity)
                }
            }
        }

        if (parent !== null) {
            // parent.addChild(entity)
        }
    }
}
