import { PlayerManager } from "./playerManager";
import { TeamChanger } from "./teamChanger";
import { HBRoom } from "./types/haxballHeadlessTypes";

export class DependencyManager {
    public room: HBRoom;
    public playerManager: PlayerManager = new PlayerManager();
    public teamChanger: TeamChanger = new TeamChanger();
} 