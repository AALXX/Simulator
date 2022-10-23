import { InputManager } from '../Input/InputManager'

/**
 *  recives events from front-end
 */
export class EngineEvents {
    public static EngineEventsinit(): void {
        EngineEvents.listenToEvents('SelectObject')
    }

    /**
     * listenToevents
     * @param {string} eventName
     */
    public static listenToEvents(eventName: string): void {
        /* eslint-disable */

        switch (eventName) {
            case 'SelectObject':
                break
            default:
                break
        }
        /* eslint-enable */
    }
}
