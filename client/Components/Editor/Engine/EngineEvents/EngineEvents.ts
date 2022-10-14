import { InputManager } from '../Input/InputManager'

/**
 *  recives events from front-end
 */
export class EngineEvents {
    public static EngineEventsinit(): void {
        EngineEvents.listenToEvents('DragObject')
    }

    /**
     * change Object Width
     * @param {any} data
     */
    private static setObjectIntoDragMode(data: any): void {}

    /**
     * listenToevents
     * @param {string} eventName
     */
    public static listenToEvents(eventName: string): void {
        /* eslint-disable */

        switch (eventName) {
            case 'DragObject':
                window.addEventListener(eventName, (e: any) => {
                    this.setObjectIntoDragMode(e.detail)
                })
                break
            default:
                break
        }
        /* eslint-enable */
    }
}
