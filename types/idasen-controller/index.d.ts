declare module 'idasen-controller' {

    export const deskManager: DeskManager;
    export namespace deskSettings {
        export { store };
        export { storeKeys };
    }
    class DeskManager {
        constructor(bluetoothAdapter: any);
        desk: Desk;
        deskController: DeskController;
        deskAddress: any;
        discoveredPeripherals: any[];
        bluetoothAdapter: any;
        customDisconnectHandlers: any[];
        isDeskReady: Promise<any>;
        createDeskPromise: () => Promise<any>;
        deskReadyPromiseResolve: (value: any) => void;
        getAvailableDevices: () => Promise<{name: string, address: string, uuid: string}[]>;
        connectAsync: (address: string) => Promise<"success" | "failure">;
        disconnectAsync: () => Promise<string>;
        setOnDisconnectHandler: () => void;
        setCustomDisconnectHandlers: () => void;
        addCustomDisconnectHandler: (callback: any) => void;
    }
    const store: Store;
    namespace storeKeys {
        const PREFLIGHT_TIME_DURATION: string;
        const MOVE_TIME_DURATION: string;
        const DEFAULT_HEIGHT_TOLERANCE_THRESHOLD: string;
        const DESK_OFFSET_HEIGHT: string;
        const RAW_MIN_HEIGHT: string;
        const RAW_MAX_HEIGHT: string;
    }
    class Desk {
        constructor(peripheral: any);
        peripheral: any;
        characteristics: {
            move: any;
            moveTo: any;
            height: any;
        };
        moveToIntervalId: any;
        connect: () => Promise<void>;
        init: () => Promise<void>;
        setCharacteristic: (name: any, characteristic: any) => void;
        setCustomPreflightDuration: (preflightTimeDuration: any) => void;
        preflightTimeDuration: any;
        getCharacteristicsAsync: (peripheral: any) => Promise<any>;
        setCharacteristics: (characteristics: any) => void;
        getCurrentHeightBufferAsync: () => any;
        getCurrentHeightAsync: () => Promise<number>;
        disconnectAsync: () => Promise<void>;
    }
    class DeskController {
        constructor(desk: any, store: any);
        desk: any;
        store: any;
        setHeightToleranceThreshold: (heightToleranceThreshold: any) => void;
        moveUpAsync: () => Promise<void>;
        moveDownAsync: () => Promise<void>;
        preflightRequestAsync: () => Promise<void>;
        moveToAsync: (requestedHeight: any) => Promise<any>;
        getMoveLoop: (requestedHeight: any) => Promise<() => Promise<any>>;
        moveToIntervalId: any;
        stopAsync: () => Promise<void>;
        moveAsync: (requestedHeight: any) => Promise<void>;
        getShouldStopMoving: (requestedHeight: any) => Promise<(current: any, requested: any) => boolean>;
        shouldStopMovingUp: (current: any, requested: any) => boolean;
        shouldStopMovingDown: (current: any, requested: any) => boolean;
        isDifferenceInThreshold(current: any, requested: any): boolean;
    }
    class Store {
        _store: {};
        clear: () => void;
        add: (key: any, value: any) => void;
        addWithOverwrite: (key: any, value: any) => void;
        get: (key: any) => any;
        exists: (key: any) => boolean;
        existsWithValue: (key: any, value: any) => boolean;
    }
    export { DeskManager };
}
