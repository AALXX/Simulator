import { IEditor } from './IEngine'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MeshManager } from './Mesh/MeshManager'

export namespace UiDesignEngine {
    /**
     ** Engine Class
     */
    export class Engine {
        private _previousTime: number = 0

        private _isFirstUpdate: boolean = true

        private _editor: IEditor
        private _scene: THREE.Scene
        private _camera: THREE.Camera
        private _renderer: THREE.WebGLRenderer

        private _controls: OrbitControls

        /**
         * Class Constructor
         * @param {number} width
         * @param {number} height
         */
        public constructor() {}

        /**
         * Resize Method
         */
        public resize(): void {}

        /**
         * Start Method
         * @param {IEditor} editor
         * @param {RefObject<HTMLCanvasElement>} canvasRef
         * @param {string} elementName
         */
        public start(
            editor: IEditor,
            canvasRef: HTMLCanvasElement,
            elementName?: string
        ): void {
            this._editor = editor

            this._scene = new THREE.Scene()
            this._camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )

            this._renderer = new THREE.WebGLRenderer({ canvas: canvasRef })
            this._renderer.setPixelRatio(window.devicePixelRatio)
            this._renderer.setClearColor('#333333')
            this._renderer.setSize(window.innerWidth, window.innerHeight)

            this._camera.position.setZ(4)
            this._camera.position.setY(3)

            this._controls = new OrbitControls(
                this._camera,
                this._renderer.domElement
            )

            // Trigger a resize to make sure the viewport is corrent.
            this.resize()

            MeshManager.load(this._scene)

            // Begin the preloading phase, which waits for various thing to be loaded before starting the game.
            this.preloading()

            this._editor.start(this._scene)
        }

        /**
         * before loadeing method
         */
        private preloading(): void {
            // Perform items such as loading the first/initial level, etc.
            this._editor.updateReady(this._scene)

            //Engine Default utilities
            const gridFloor = new THREE.GridHelper(200, 50)
            const Axes = new THREE.AxesHelper(40)
            Axes.position.y = 0.1
            this._scene.add(gridFloor, Axes)
            // Kick off the render loop.
            this.loop()
        }

        /**
         * main game loop
         */
        private loop(): void {
            if (this._isFirstUpdate) {
            }

            const delta = performance.now() - this._previousTime

            this.update(delta)
            this.render(delta)

            this._previousTime = performance.now()
            this._renderer.render(this._scene, this._camera)

            requestAnimationFrame(this.loop.bind(this))
        }

        /**
         * Update Method
         * @param {number} delta
         */
        private update(delta: number): void {
            this._editor.update(delta)
            this._controls.update()
        }

        /**
         * Render method
         * @param {number} delta
         */
        private render(delta: number): void {}
    }
}
