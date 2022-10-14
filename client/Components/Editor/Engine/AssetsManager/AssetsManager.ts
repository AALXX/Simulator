import { IAssetLoader } from './interfaces/IAssetLoader'
import { IAsset } from './interfaces/IAsset'
import { Message } from '../MessageManager/Message'
import { JsonAssetLoader } from './PorjectFileLoader'

/**
 * The message code prefix for asset load notifications.
 */
export const MESSAGE_ASSET_LOADER_ASSET_LOADED = 'MESSAGE_ASSET_LOADER_ASSET_LOADED::'

/** Manages all assets in the engine. */
export class AssetManager {
    private static _loaders: IAssetLoader[] = []
    private static _loadedAssets: { [name: string]: IAsset } = {}

    /** Private to enforce static method calls and prevent instantiation. */
    private constructor() {}

    /** Initializes this manager. */
    public static initialize(): void {
        AssetManager._loaders.push(new JsonAssetLoader())
    }

    /**
     * Registers the provided loader with this asset manager.
     * @param {IAssetLoader} loader The loader to be registered.
     */
    public static registerLoader(loader: IAssetLoader): void {
        AssetManager._loaders.push(loader)
    }

    /**
     * A callback to be made from an asset loader when an asset is loaded.
     * @param {IAsset} asset
     */
    public static onAssetLoaded(asset: IAsset): void {
        AssetManager._loadedAssets[asset.Name] = asset
        Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.Name, this, null, asset)
    }

    /**
     * A callback to be made from an project loader when an asset is loaded.
     * @param {IAsset} asset
     */
    public static onProjectLoaded(asset: IAsset): void {
        AssetManager._loadedAssets[asset.Data.ProjectData.PrjToken] = asset
        Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.Data.ProjectData.PrjToken, this, null, asset)
    }

    /**
     * Attempts to load an asset using a registered asset loader.
     * @param {string} assetName The name/url of the asset to be loaded.
     */
    public static loadAsset(assetName: string): void {
        const extension = assetName.split('.').pop().toLowerCase()
        for (const l of AssetManager._loaders) {
            l.loadAsset(assetName)
            return
        }

        console.warn('Unable to load asset with extension ' + extension + ' because there is no loader associated with it.')
    }

    public static loadProjectFile(ProjectToken: string): void {
        for (const l of AssetManager._loaders) {
            l.loadProjectFile(ProjectToken)
            return
        }

        console.warn('Unable to load project with  ' + ProjectToken + ' token because there is no loader associated with it.')
    }

    /**
     * Indicates if an asset with the provided name has been loaded.
     * @param {string} assetName The asset name to check.
     * @return {boolean}
     */
    public static isAssetLoaded(assetName: string): boolean {
        return AssetManager._loadedAssets[assetName] !== undefined
    }

    /**
     * Attempts to get an asset with the provided name. If found, it is returned; otherwise, undefined is returned.
     * @param {string} assetName The asset name to get.
     * @return {IAsset}
     */
    public static getAsset(assetName: string): IAsset {
        if (AssetManager._loadedAssets[assetName] !== undefined) {
            return AssetManager._loadedAssets[assetName]
        } else {
            AssetManager.loadAsset(assetName)
        }

        return undefined
    }

    /**
     * Attempts to get an asset with the provided name. If found, it is returned; otherwise, undefined is returned.
     * @param {string} assetName The asset name to get.
     * @return {IAsset}
     */
    public static getProjectFile(prjToken: string): IAsset {
        if (AssetManager._loadedAssets[prjToken] !== undefined) {
            return AssetManager._loadedAssets[prjToken]
        } else {
            AssetManager.loadProjectFile(prjToken)
        }

        return undefined
    }
}
