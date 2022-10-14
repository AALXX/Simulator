import { EditorEntity } from '../Level/EditorEntity'
import { IComponent } from './interfaces/IComponent'
import { IComponentData } from './interfaces/IComponentData'

/**
 * Base compoenent Class resposible with rendering/updating
 */
export abstract class BaseComponent implements IComponent {
    protected _owner: EditorEntity
    protected _data: IComponentData

    public name: string

    /**
     * class constructor
     * @param {IComponentData} data
     */
    public constructor(data: IComponentData) {
        this._data = data
        this.name = data.name
    }

    /**
     * get owner
     */
    public get owner(): EditorEntity {
        return this._owner
    }

    /**
     * set owner
     * @param {EditorEntity} owner
     */
    public setOwner(owner: EditorEntity): void {
        this._owner = owner
    }

    /**
     * load
     */
    public load(): void {}

    /**
     * before update
     */
    public updateReady(): void {}

    /**
     * update method
     * @param {number} time
     */
    public update(time: number): void {}
}
