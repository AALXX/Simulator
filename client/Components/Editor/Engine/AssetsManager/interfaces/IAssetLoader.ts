/** Represents an asset loader. */
export interface IAssetLoader {
    /**
     * Loads an asset with the given name.
     * @param assetName The name of the asset to be loaded.
     */
    loadAsset(assetName: string): void

    /**
     * Loads an project file with the given token.
     * @param projectToken The name of the asset to be loaded.
     */
    loadProjectFile(projectToken: string): void
}
