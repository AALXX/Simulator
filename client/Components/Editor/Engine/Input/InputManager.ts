import { RefObject } from 'react'
import { Message } from '../MessageManager/Message'
import * as THREE from 'three'

// / <reference path="../Math/Vector2.ts" />

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

        // Message.send(MESSAGE_MOUSE_CLICK, this, event, new MouseContext(InputManager._leftDown, InputManager._rightDown))
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
}
