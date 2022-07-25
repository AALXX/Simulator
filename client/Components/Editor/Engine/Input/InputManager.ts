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
    private static draggable: THREE.Object3D

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
        this.clickMouse = new THREE.Vector2()
        this.moveMouse = new THREE.Vector2()
    }

    public static intersect(pos: THREE.Vector2, cameraRef: THREE.Camera, sceneRef: THREE.Scene) {
        this.raycaster.setFromCamera(pos, cameraRef)
        return this.raycaster.intersectObjects(sceneRef.children)
    }

    public static SelectObject(event: MouseEvent, cameraRef: THREE.Camera, sceneRef: THREE.Scene): void {
        if (this.draggable) {
            this.draggable = null as any
            return
        }

        this.clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        const found = InputManager.intersect(this.clickMouse, cameraRef, sceneRef)
        if (found.length > 0) {
            if (found[0].object.userData.draggable) {
                this.draggable = found[0].object
            }
        }
    }

    public static dragObject(cameraRef: THREE.Camera, sceneRef: THREE.Scene) {
        if (this.draggable != null) {
            const found = InputManager.intersect(this.moveMouse, cameraRef, sceneRef)
            if (found.length > 0) {
                for (let i = 0; i < found.length; i++) {
                    let target = found[i].point
                    this.draggable.position.x = target.x
                    this.draggable.position.z = target.z
                }
            }
        }
    }

    public static UpdateMouseMove(event: MouseEvent) {
        this.moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1
        this.moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
}
