import { DI } from "../../src/main";
import { HBPlayer, HBTeamId } from "./types/haxballHeadlessTypes";

type TeamChangeRequest = {
    playerId: number;
    oldTeamId: HBTeamId;
    newTeamId: HBTeamId;
    time: Date;
    onDone?: () => void;
}

export class TeamChanger {
    private _changeProcesses: TeamChangeRequest[] = [];

    public setPlayerTeam(
        playerId: number, 
        teamId: HBTeamId,
        onDone?: () => void,
    ) {
        this._changeProcesses = [...this._changeProcesses, {
            playerId: playerId,
            oldTeamId: teamId, //@todo find oldTeamId;
            newTeamId: teamId,
            time: new Date(),
            onDone: onDone,
        }]
        DI.room.setPlayerTeam(playerId, teamId);
    }

    public onPlayerTeamChange(changedPlayer: HBPlayer, byPlayer: HBPlayer | null) {
        if(byPlayer == null) {
            const foundProcess = this._changeProcesses.find(p => p.playerId == changedPlayer.id);
            //@todo set player team;
            if(foundProcess != null) {

                if(foundProcess.onDone != null) {
                    foundProcess.onDone();
                }
                this.removePlayerProcesses(changedPlayer.id);
            }
        }
    }

    public onPlayerLeave(playerLeft: HBPlayer) {
        this.removePlayerProcesses(playerLeft.id);
    }

    private removePlayerProcesses(playerId: number) {
        this._changeProcesses = this._changeProcesses.filter(p => p.playerId != playerId);
    }
}