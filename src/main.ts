import { DependencyManager } from "../extra/base/dependencyManager"
import { HBRoom, HBRoomConfig } from "../extra/base/types/haxballHeadlessTypes";

export {}
declare global {
    interface Window {
        onHBLoaded: any, 
        HBInit: any
    }
}
declare function HBInit(roomInitProperties: HBRoomConfig) : HBRoom;
declare var ROOM_TOKEN: string;

export const DI = new DependencyManager();

const ROOM_INIT_PROPERTIES: HBRoomConfig = {
    token: ROOM_TOKEN,
    roomName: "Deneme",
    public: false,
    maxPlayers: 30,
    noPlayer: false,
}

window.onHBLoaded = () => {
    DI.room = HBInit(ROOM_INIT_PROPERTIES)
}

if (typeof window.HBInit === 'function') {
    window.onHBLoaded()
}