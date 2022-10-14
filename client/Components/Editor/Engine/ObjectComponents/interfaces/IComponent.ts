import { EditorEntity } from '../../Level/EditorEntity'

export interface IComponent {
    /**
     * component name
     */
    name: string

    /**
     * owner of the component
     */
    readonly owner: EditorEntity
    setOwner(owner: EditorEntity): void

    updateReady(): void

    load(): void

    update(time: number): void
}
