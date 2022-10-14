import { Message } from '../MessageManager/Message'
import * as THREE from 'three'

// / <reference path="../Math/Vector2.ts" />

/** The message code for mouse down events. */
export const MESSAGE_MOUSE_MOVE: string = 'MOUSE_MOVE'

/** The message code for mouse down events. */
export const MESSAGE_MOUSE_DOWN: string = 'MOUSE_DOWN'

/** The message code for mouse up events. */
export const MESSAGE_MOUSE_UP: string = 'MOUSE_UP'

/** The message code for mouse click events. */
export const MESSAGE_MOUSE_CLICK: string = 'MOUSE_CLICK'

/* eslint-disable */

/** Defines key codes for keyboard keys. */
export enum Keys {
    /** The left arrow key */
    ARROW_LEFT = 37,

    /** The up arrow key */
    ARROW_UP = 38,

    /** The right arrow key */
    ARROW_RIGHT = 39,

    /** The down arrow key */
    ARROW_DOWN = 40,

    G_KEY = 71,

    S_KEY = 83,

    X_KEY = 88,

    Y_KEY = 89,

    Z_KEY = 90,

    ESC_KEY = 27,

    ControlLeft = 17
}

/* eslint-enable */

/** Contains mouse state data to be used throughout the engine. */
export class MouseContext {
    /** Indicates if the left mouse button is down. Default: false. */
    public leftDown: boolean

    /** Indicates if the right mouse button is down. Default: false. */
    public rightDown: boolean

    /** The mouse position. */
    public position: THREE.Vec2

    private _objectPositionBeforeEnterDragMode: THREE.Vector3

    /**
     * class constructor
     * @param {boolean} leftDown
     * @param {boolean} rightDown
     * @param {Vector2} position
     */
    public constructor(leftDown: boolean = false, rightDown: boolean = false) {
        this.leftDown = leftDown
        this.rightDown = rightDown
    }
}

/** Contains mouse state data to be used throughout the engine. */
export class SelectObjectContext {
    /** Indicates if the left mouse button is down. Default: false. */
    public name: string

    /**
     * class constructor
     * @param {string} name
     */
    public constructor(name: string) {
        this.name = name
    }
}

/** Manages all input from devices such as the mouse and keyboard. */
export class InputManager {
    private static _keys: boolean[] = []

    private static _leftDown: boolean = false
    private static _rightDown: boolean = false

    ///////////////////////////////////////
    //select and move objects in scene vars
    ///////////////////////////////////////
    private static raycaster: THREE.Raycaster
    private static clickMouse: THREE.Vector2
    private static moveMouse: THREE.Vector2
    private static selectedObject: THREE.Object3D
    private static isObjectSelected: boolean = false
    public static objectInDragMode: boolean = false
    public static objectInScaleMode: boolean = false

    /**
     * Initializes the input manager.
     * @param {RefObject<HTMLCanvasElement>} viewport The canvas element to attach input events to
     */
    public static initialize(): void {
        for (let i = 0; i < 255; ++i) {
            InputManager._keys[i] = false
        }

        window.addEventListener('keydown', InputManager.onKeyDown)
        window.addEventListener('keyup', InputManager.onKeyUp)

        window.addEventListener('mousemove', InputManager.onMouseMove)
        window.addEventListener('mousedown', InputManager.onMouseDown)
        window.addEventListener('mouseup', InputManager.onMouseUp)
        window.addEventListener('click', InputManager.onMouseClick)
    }

    //-----------------------------------------------------------------------------
    //                              Key Input                                    //
    //-----------------------------------------------------------------------------

    /**
     * Indicates if the provided key is currently down.
     * @param {keays} key  The key to check.
     * @return {boolean}
     */
    public static isKeyDown(key: Keys): boolean {
        return InputManager._keys[key]
    }

    /**
     * onKeyDown event func
     * @param {KeyboardEvent} event
     * @return {boolean}
     */
    private static onKeyDown(event: KeyboardEvent): boolean {
        InputManager._keys[event.keyCode] = true
        return true
    }

    /**
     * onKeyUp event func
     * @param {KeyboardEvent} event
     * @return {boolean}
     */
    private static onKeyUp(event: KeyboardEvent): boolean {
        InputManager._keys[event.keyCode] = false
        return true
    }

    //-----------------------------------------------------------------------------
    //                              Mouse Input                                  //
    //-----------------------------------------------------------------------------

    /**
     * onMouseMove event func
     * @param {MouseEvent} event
     */
    private static onMouseMove(event: MouseEvent): void {
        if (event.button === 0) {
            this._leftDown = false
        } else if (event.button === 2) {
            this._rightDown = false
        }

        Message.send(MESSAGE_MOUSE_MOVE, this, event)
    }

    /**
     * onMouseDown event func
     * @param {MouseEvent} event
     */
    private static onMouseDown(event: MouseEvent): void {
        if (event.button === 0) {
            this._leftDown = true
        } else if (event.button === 2) {
            this._rightDown = true
        }

        Message.send(MESSAGE_MOUSE_DOWN, this, event, new MouseContext(InputManager._leftDown, InputManager._rightDown))
    }

    /**
     * onMouseUp event func
     * @param {MouseEvent} event
     */
    private static onMouseUp(event: MouseEvent): void {
        if (event.button === 0) {
            this._leftDown = false
        } else if (event.button === 2) {
            this._rightDown = false
        }

        Message.send(MESSAGE_MOUSE_UP, this, event, new MouseContext(InputManager._leftDown, InputManager._rightDown))
    }

    /**
     * onMouseClick event func
     * @param {MouseEvent} event
     */
    private static onMouseClick(event: MouseEvent): void {
        if (event.button === 0) {
            this._leftDown = false
        } else if (event.button === 2) {
            this._rightDown = false
        }

        Message.send(MESSAGE_MOUSE_CLICK, this, event, new MouseContext(InputManager._leftDown, InputManager._rightDown))
    }

    //-----------------------------------------------------------------------------
    //                              Move Objects in scene                        //
    //-----------------------------------------------------------------------------

    public static initSceneObjectInteract() {
        this.raycaster = new THREE.Raycaster()
        this.clickMouse = new THREE.Vector2() // create once

        this.moveMouse = new THREE.Vector2()
    }

    public static intersect(pos: THREE.Vector2, cameraRef: THREE.Camera, sceneRef: THREE.Scene) {
        this.raycaster.setFromCamera(pos, cameraRef)
        return this.raycaster.intersectObjects(sceneRef.children)
    }

    private static selectOtherObject(name: string, cameraRef: THREE.Camera, sceneRef: THREE.Scene): Boolean {
        const found = InputManager.intersect(this.clickMouse, cameraRef, sceneRef)

        if (found[0].object.userData.name == name) {
            return false
        }

        return true
    }

    public static SelectObject(event: MouseEvent, cameraRef: THREE.Camera, sceneRef: THREE.Scene): void {
        const found = InputManager.intersect(this.moveMouse, cameraRef, sceneRef)
        if (this.isObjectSelected && this.objectInDragMode) {
            this.objectInDragMode = false
            return
        }

        if (this.isObjectSelected && this.objectInScaleMode) {
            this.objectInScaleMode = false
            return
        }

        if (found[0] != undefined && found[0].object != null && found[0].object.userData.selectable) {
            if (this.isObjectSelected && InputManager.selectOtherObject(found[0].object.userData.name, cameraRef, sceneRef)) {
                this.selectedObject = null as any
                this.isObjectSelected = false
                Message.send(`DESELECT_OBJECT: ${found[0].object.userData.name}`, this, event)
                return
            }
            this.clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1
            this.clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
            if (found.length > 0) {
                if (found[0].object.userData.selectable) {
                    this.selectedObject = found[0].object
                    this.isObjectSelected = true
                    Message.send(`SELECT_OBJECT: ${found[0].object.userData.name}`, this, event, new SelectObjectContext(found[0].object.userData.name))
                }
            }
        }
    }

    public static dragObject(cameraRef: THREE.Camera, sceneRef: THREE.Scene): void {
        if (this.selectedObject != null && this.isObjectSelected == true && this.objectInDragMode) {
            const found = InputManager.intersect(this.moveMouse, cameraRef, sceneRef)
            if (found.length > 0) {
                if (InputManager.isKeyDown(Keys.ESC_KEY)) {
                    console.log('object')
                    // this.selectedObject.position
                }

                if (InputManager.isKeyDown(Keys.X_KEY)) {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.position.x = target.x
                    }
                } else if (InputManager.isKeyDown(Keys.Y_KEY)) {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.position.y = -target.z
                    }
                } else if (InputManager.isKeyDown(Keys.Z_KEY)) {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.position.z = target.z
                    }
                } else {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.position.x = target.x
                        this.selectedObject.position.z = target.z
                    }
                }
            }
        }
    }

    public static scaleObject(cameraRef: THREE.Camera, sceneRef: THREE.Scene): void {
        if (this.selectedObject != null && this.isObjectSelected == true && this.objectInScaleMode) {
            const found = InputManager.intersect(this.moveMouse, cameraRef, sceneRef)
            if (found.length > 0) {
                if (InputManager.isKeyDown(Keys.ESC_KEY)) {
                    console.log('object')
                    // this.selectedObject.position
                }

                if (InputManager.isKeyDown(Keys.X_KEY)) {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.scale.x = target.x
                    }
                } else if (InputManager.isKeyDown(Keys.Y_KEY)) {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.scale.y = target.x / 10
                    }
                } else if (InputManager.isKeyDown(Keys.Z_KEY)) {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.scale.z = target.x
                    }
                } else {
                    for (let i = 0; i < found.length; i++) {
                        let target = found[i].point
                        this.selectedObject.scale.x = target.x
                        this.selectedObject.scale.z = target.z
                    }
                }
            }
        }
    }

    public static UpdateMouseMove(event: MouseEvent) {
        this.moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
}
