import { EditorEntity } from './EditorEntity'

/**
 * Entity Manager man
 */
export class EntitiManager {
    public static entities: EditorEntity[] = []

    //add entity to array
    public static addEntity(entity: EditorEntity) {
        EntitiManager.entities.push(entity)
    }

    //load all objects
    public static load(): void {
        for (let i = 0; i < Object.keys(EntitiManager.entities).length; i++) {
            EntitiManager.entities[i].load()
        }
    }

    //update all objects (unefficiently)
    public static update(time: number): void {
        for (let i = 0; i < Object.keys(EntitiManager.entities).length; i++) {
            EntitiManager.entities[i].update(time)
        }
    }
}
