import { Coordinate } from "../entities/coordinate";
import { HBPlayer, HBTeamId } from "../types/haxballHeadlessTypes";

export class Player {
    private _id: number;
    private _name: string;
    private _team: HBTeamId;
    private _admin: boolean;
    private _position: Coordinate | null;
    private _auth: string | null;
    private _conn: string;

    constructor(player: HBPlayer) {
        this._id = player.id;
        this._name = player.name;
        this._team = player.team;
        this._admin = player.admin;
        this._position = player.position;
        this._auth = player.auth;
        this._conn = player.conn;
    }

    public get id() {return this._id};
    public get name() {return this._name};
    public get team() {return this._team};
    public get admin() {return this._admin};
    public get position() {return this._position};
    public get auth() {return this._auth};
    public get conn() {return this._conn};
}