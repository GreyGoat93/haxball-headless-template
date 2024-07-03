import { Coordinate } from "../entities/coordinate";

export type HBFontStyle = "normal" | "bold" | "italic" | "small" | "small-bold" | "small-italic";
export type HBSoundStyle = 0 | 1 | 2;

export type HBGeolocation = {
    code: string,
    lat: number,
    lon: number,
}

export type HBRoomConfig = {
    roomName?: string,
    playerName?: string,
    password?: string,
    maxPlayers?: number,
    public?: boolean,
    geo?: HBGeolocation,
    token?: string,
    noPlayer?: boolean, 
}

export type HBTeamId = 0 | 1 | 2;

export class HBScores {
    red: number;
    blue: number;
    time: number;
    scoreLimit: number;
    timeLimit: number;
}

export class HBDiscProperties {
    x?: number;
    y?: number;
    xspeed?: number;
    yspeed?: number;
    xgravity?: number;
    ygravity?: number;
    radius?: number;
    bCoeff?: number;
    invMass?: number;
    damping?: number;
    color?: number;
    cMask?: number;
    cGroup?: number;
}

export class HBPlayer {
    id: number;
    name: string;
    team: HBTeamId;
    admin: boolean;
    position: Coordinate | null;
    auth: string;
    conn: string;
}

export type HBRoom = {
    onPlayerJoin?: (player: HBPlayer) => void | null,
    onPlayerLeave?: (player: HBPlayer) => void | null,
    onTeamVictory?: (player: HBPlayer) => void | null,
    onPlayerChat?: (player: HBPlayer, message: string) => boolean | null,
    onPlayerBallKick?: (player: HBPlayer) => void | null,
    onTeamGoal?: (team: HBTeamId) => void | null,
    onGameStart?: () => void | null,
    onGameStop?: () => void | null,
    onPositionsReset?: () => void | null,
    onPlayerAdminChange?: (changedPlayer: HBPlayer, byPlayer: HBPlayer) => void | null,
    onPlayerTeamChange?: (changedPlayer: HBPlayer, byPlayer: HBPlayer) => void | null,
    onPlayerKicked?: (kickedPlayer : HBPlayer, reason : string, ban : boolean, byPlayer : HBPlayer) => void | null,
    onGameTick?: () => void | null,
    onGamePause?: (byPlayer: HBPlayer) => void | null,
    onGameUnpause?: (byPlayer: HBPlayer) => void | null,
    onPlayerActivity?: (player: HBPlayer) => void | null,
    onRoomLink?: (url: string) => void | null,

    getDiscProperties: (discIndex: number) => HBDiscProperties | null,
    getBallPosition: () => Coordinate,
    getPlayer: (playerId: number) => HBPlayer | null,
    getPlayerDiscProperties: (playerId: number) => HBDiscProperties | null,
    getPlayerList: () => HBPlayer[],
    getScores: () => HBScores,
    kickPlayer: (playerID: number, reason: string, ban: boolean) => void,
    pauseGame: (pauseState: boolean) => void,
    reorderPlayers: (playerIdList: number[], moveToTop: boolean) => void,
    sendAnnouncement: (msg: string, targetId?: number, color?: number, style?: HBFontStyle, sound?: HBSoundStyle) => void,
    setCustomStadium: (stadiumFileContents: string) => void,
    setDefaultStadium: (stadiumName: string) => void,
    setDiscProperties: (discIndex: number, properties: HBDiscProperties) => null,
    setPlayerAdmin: (playerID: number, admin: boolean) => void,
    setPlayerAvatar: (playerID: number, avatar: string) => void,
    setPlayerDiscProperties: (playerId: number | null, properties: HBDiscProperties) => void,
    setPlayerTeam: (playerID: number, team: number) => void,
    setScoreLimit: (limit: number) => void,
    setTeamColors: (team: HBTeamId, angle: number, textColor: number, colors: number[]) => void,
    setTeamsLock: (locked: boolean) => void,
    setTimeLimit: (limitInMinutes: number) => void,
    startGame: () => void,
    stopGame: () => void,
}