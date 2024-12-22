export interface Cable {
    isGrabbing: boolean,
    cableConnected: boolean
    cableColor: string,
    xInitialPosition: number,
    yInitialPosition: number,
    xActualPosition: number,
    yActualPosition: number,
    cableValue: number
}

export interface Handle {
    xActualPosition: number,
    yActualPosition: number,
}