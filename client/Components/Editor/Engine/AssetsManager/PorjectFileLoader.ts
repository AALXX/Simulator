import axios from 'axios'
import { AssetManager } from './AssetsManager'
import { IAsset } from './interfaces/IAsset'
import { IAssetLoader } from './interfaces/IAssetLoader'

/** Represents an Json asset */
export class JsonAsset implements IAsset {
    /** The name of this asset. */
    public readonly Name: string

    /** The data of this asset. */
    public readonly Data: any

    /**
     * Creates a new image asset.
     * @param {string} name The name of this asset.
     * @param {any} data The data of this asset.
     */
    public constructor(name: string, data: any) {
        this.Name = name
        this.Data = data
    }
}

/** Represents an Json asset loader. */
export class JsonAssetLoader implements IAssetLoader {
    /**
     * Loads an asset with the given name.
     * @param {string} assetName The name of the asset to be loaded.
     */
    public loadAsset(assetName: string): void {
        const request: XMLHttpRequest = new XMLHttpRequest()
        request.open('GET', assetName)
        request.addEventListener('load', this.onJsonLoaded.bind(this, assetName, request))
        request.send()
    }

    loadProjectFile(projectToken: string): void {
        axios
            .get(`http://192.168.72.81:7000/api/get-projects/level-file/${projectToken}`)
            .then(res => {
                const asset = new JsonAsset(projectToken, res.data)
                AssetManager.onProjectLoaded(asset)
            })
            .catch(err => {
                console.log(err)
            })
    }

    /**
     * on json loaded
     * @param {string} assetName
     * @param {XMLHttpRequest} request
     */
    private onJsonLoaded(assetName: string, request: XMLHttpRequest): void {
        console.log('onJsonLoaded: assetName/request', assetName, request)

        if (request.readyState === request.DONE) {
            const json = JSON.parse(request.responseText)
            const asset = new JsonAsset(assetName, json)
            AssetManager.onAssetLoaded(asset)
        }
    }
}
