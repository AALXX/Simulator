/**
 *  recives events from front-end
 */
export class EngineEvents {
    public static EngineEventsinit(): void {
        EngineEvents.listenToEvents('SelectObject')
    }

    /**
     * change Object Width
     * @param {any} data
     */
    private static GetSelectedObjectData(data: any): void {
        console.log(data)

        // EditorEntity.(data.componentName);
    }

    /**
     * listenToevents
     * @param {string} eventName
     */
    public static listenToEvents(eventName: string): void {
        /* eslint-disable */

        switch (eventName) {
            case 'SelectObject':
                window.addEventListener(eventName, (e: any) => {
                    this.GetSelectedObjectData(e.detail)
                })
                break
            default:
                break
        }
        /* eslint-enable */
    }
}
