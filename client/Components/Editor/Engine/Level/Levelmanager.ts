import { AssetManager, MESSAGE_ASSET_LOADER_ASSET_LOADED } from '../AssetsManager/AssetsManager'
import { JsonAsset } from '../AssetsManager/PorjectFileLoader'
import { Message } from '../MessageManager/Message'
import { Level } from './Level'

/**
 * Manages levels in the engine. Levels (for now) are registered with this manager
 * so that they may be loaded on demand. Register a level name
 * with a file path and load the level configurations dynamically.
 */
export class LevelManager {
    private static _registeredLevels: { [name: string]: string } = {}
    private static _activeLevel: Level
    private static _configLoaded: boolean = false
    private static _scene: THREE.Scene

    /** Private constructor to enforce singleton pattern. */
    private constructor() {}

    /** Indicates if this manager is loaded. */
    public static get isLoaded(): boolean {
        return LevelManager._configLoaded
    }

    /** Gets the active level. */
    public static get activeLevel(): Level {
        return LevelManager._activeLevel
    }

    /** Loads this manager. */
    public static load(scene: THREE.Scene): void {
        this._scene = scene
        // Get the asset(s). TODO: This probably should come from a central asset manifest.
        const projectConfig = AssetManager.getProjectFile('kw8rybzkj4ova9uyj1')
        if (projectConfig !== undefined) {
            LevelManager.processProjectFile(projectConfig as JsonAsset)
        } else {
            // Listen for the asset load.
            Message.subscribeCallback(MESSAGE_ASSET_LOADER_ASSET_LOADED + 'kw8rybzkj4ova9uyj1', LevelManager.onMessage)
        }
    }

    /**
     * Changes the active level to the one with the provided name.
     * @param {string} token The name of the level to change to.
     */
    public static changeLevel(token: string): void {
        if (LevelManager._activeLevel !== undefined) {
            LevelManager._activeLevel.onDeactivated()
            LevelManager._activeLevel.unload()
            LevelManager._activeLevel = undefined
        }

        // Make sure the level is registered.
        // console.log(LevelManager._registeredLevels)
        if (LevelManager._registeredLevels[token] !== undefined) {
            // If the level asset is already loaded, get it and use it to load the level.
            // Otherwise, retrieve the asset and load the level upon completion.
            if (AssetManager.isAssetLoaded(LevelManager._registeredLevels[token])) {
                const asset = AssetManager.getAsset(LevelManager._registeredLevels[token])
                LevelManager.loadLevel(asset)
            } else {
                Message.subscribeCallback(MESSAGE_ASSET_LOADER_ASSET_LOADED + LevelManager._registeredLevels[token], LevelManager.onMessage)
                AssetManager.loadAsset(LevelManager._registeredLevels[token])
            }
        } else {
            console.error(`Level named: ${token} is not registered.`)
        }
    }

    /**
     * The message handler.
     * @param {Message} message The message to be handled.
     */
    public static onMessage(message: Message): void {
        // TODO: one for each asset.
        if (message.code === MESSAGE_ASSET_LOADER_ASSET_LOADED + 'kw8rybzkj4ova9uyj1') {
            Message.unsubscribeCallback(MESSAGE_ASSET_LOADER_ASSET_LOADED + 'kw8rybzkj4ova9uyj1', LevelManager.onMessage)
            LevelManager.processProjectFile(message.context as JsonAsset)
        } else if (message.code.indexOf(MESSAGE_ASSET_LOADER_ASSET_LOADED) !== -1) {
            console.log('Project loaded:' + message.code)
            const asset = message.context as JsonAsset
            LevelManager.loadLevel(asset)
        }
    }

    /**
     * load level
     * @param {JsonAsset} asset
     */
    private static loadLevel(asset: JsonAsset): void {
        console.log('Loading project:' + asset.Name)
        const data = asset.Data
        let projectName: string
        if (data.ProjectData.name === undefined) {
            throw new Error('project file format exception: Project name not present.')
        } else {
            projectName = String(data.name)
        }

        let description: string
        if (data.ProjectData.description !== undefined) {
            description = String(data.description)
        }

        LevelManager._activeLevel = new Level(projectName, description, this._scene)
        LevelManager._activeLevel.initialize(data)
        LevelManager._activeLevel.onActivated()
        LevelManager._activeLevel.load()

        Message.send('PROJECT_LOADED', this, null)
    }

    /**
     * processLevel
     * @param {JsonAsset} asset
     */
    private static processProjectFile(asset: JsonAsset): void {
        const projectFile = asset.Data.ProjectData
        if (projectFile) {
            if (projectFile.PrjToken !== undefined) {
                LevelManager._registeredLevels[projectFile.PrjToken] = projectFile.PrjToken
            } else {
                throw new Error('Invalid page config file format: name or file is missing')
            }
        }

        // TODO: Should only set this if ALL queued assets have loaded.
        LevelManager._configLoaded = true
    }
}
