import { IComponent } from '../ObjectComponents/interfaces/IComponent'
import { IMessageHandler } from '../MessageManager/IMessageHandler'
import { Message } from '../MessageManager/Message'
import * as THREE from 'three'
import { InputManager, Keys } from '../Input/InputManager'

/**
 * Null object in the world responable for world state
 */
export class EditorEntity implements IMessageHandler {
    private _isSelected: boolean = false
    private object: THREE.Mesh
    private _dataSection: any

    private _children: EditorEntity[] = []
    private _parent: EditorEntity
    private _isLoaded: boolean = false
    private _components: IComponent[] = []
    private _isVisible: boolean = true

    private _scene: THREE.Scene

    /** The name of this object. */
    public name: string

    /** The transform of this entity. */

    /**
     * Creates a new entity.
     * @param {strimng} name The name of this entity.
     * @param {EditorEntity} sceneGraph The scenegraph to which this entity belongs.
     */
    public constructor(name: string, scene: THREE.Scene, dataSection: any) {
        this.name = name
        this._scene = scene
        this._dataSection = dataSection
    }

    /** Returns the parent of this entity. */
    public get parent(): EditorEntity {
        return this._parent
    }

    /**
     * set parent for entity
     * @param {EditorEntity} newParent
     */
    public set parent(newParent: EditorEntity) {
        this._parent = newParent
    }

    /** Indicates if this entity has been loaded. */
    public get isLoaded(): boolean {
        return this._isLoaded
    }

    /** Indicates if this entity is currently visible. */
    public get isVisible(): boolean {
        return this._isVisible
    }

    /** Sets visibility of this entity.
     * @param {boolean} value
     */
    public set isVisible(value: boolean) {
        this._isVisible = value
    }

    /**
     * Recursively attempts to retrieve a component with the given name from this entity or its children.
     * @param {String} name The name of the component to retrieve.
     * @return {IComponent}
     */
    public getComponentByName(name: string): IComponent {
        for (const component of this._components) {
            if (component.name === name) {
                return component
            }
        }

        for (const child of this._children) {
            const component = child.getComponentByName(name)
            if (component !== undefined) {
                return component
            }
        }

        return undefined
    }

    /**
     * Recursively attempts to retrieve a child entity with the given name from this entity or its children.
     * @param {string} name The name of the entity to retrieve.
     * @return {EditorEntity}
     */
    public getEntityByName(name: string): EditorEntity {
        if (this.name === name) {
            return this
        }

        for (const child of this._children) {
            const result = child.getEntityByName(name)
            if (result !== undefined) {
                return result
            }
        }

        return undefined
    }

    /**
     * Adds the given component to this entity.
     * @param {IComponent} component The component to be added.
     */
    public addComponent(component: IComponent): void {
        this._components.push(component)
        component.setOwner(this)
    }

    /**
     * on message
     * @param {Message} message
     */
    onMessage(message: Message): void {
        switch (message.code) {
            case `SELECT_OBJECT: ${this.name}`:
                this._isSelected = true
                window.dispatchEvent(
                    new CustomEvent(`SelectObject`, {
                        detail: {
                            name: this.name,
                            transform: {
                                position: this.object.position,
                                scale: this.object.scale
                            }
                        }
                    })
                )
                break
            case `DESELECT_OBJECT: ${this.name}`:
                this._isSelected = true
                console.log(this._isSelected)
                break
        }
    }
    /** Performs loading procedures on this entity. */
    public load(): void {
        this._isLoaded = true

        switch (this._dataSection.type) {
            case 'BoxObject':
                this.object = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshMatcapMaterial({ color: 0x00ff00 }))
                break
        }

        this.object.scale.set(this._dataSection.transform.scale.x, this._dataSection.transform.scale.y, this._dataSection.transform.scale.z)
        this.object.position.set(this._dataSection.transform.position.x, this._dataSection.transform.position.y, this._dataSection.transform.position.z)

        this._scene.add(this.object)

        this.object.userData.selectable = true
        this.object.userData.name = this._dataSection.name

        Message.subscribe(`SELECT_OBJECT: ${this.name}`, this)
        Message.subscribe(`DESELECT_OBJECT: ${this.name}`, this)

        for (const c of this._components) {
            c.load()
        }
    }

    /** Performs pre-update procedures on this entity. */
    public updateReady(): void {
        for (const c of this._components) {
            c.updateReady() 
        }
    }

    /**
     * Performs update procedures on this entity (recurses through children,
     * components and behaviors as well).
     * @param {number} time The delta time in milliseconds since the last update call.
     */
    public update(time: number): void {
        if (this._isSelected && InputManager.isKeyDown(Keys.G_KEY)) {
            InputManager.objectInDragMode = true
        }

        if (this._isSelected && InputManager.isKeyDown(Keys.S_KEY)) {
            InputManager.objectInScaleMode = true
        }

        if (this._isSelected && InputManager.isKeyDown(Keys.ESC_KEY)) {
            this._isSelected = false
        }

        if (this._isSelected) {
            // console.log(this.name)
            window.dispatchEvent(
                new CustomEvent(`UpdateObject`, {
                    detail: {
                        name: this.name,
                        transform: {
                            position: this.object.position,
                            scale: this.object.scale
                        }
                    }
                })
            )
        }

        for (const c of this._components) {
            c.update(time)
        }
    }
}
