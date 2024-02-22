import { DBase, getDB } from "./DBase";
import { dateTimeToSQL } from '../../xcore/dbase/DateStr'
export class SchemeThermoStreamerSvgEntity {
    id: number = 0;
    id_devs: number = 0;
    svg: string = '';
    created_at: Date = new Date(Date.now());
    constructor() { }
}
export class SchemeThermoStreamerSvgTable {
    db: DBase;
    args: any;
    constructor(_args: any) {
        this.db = getDB();
        this.args = _args;
    }

    async insertSchemeThermoStreamerSVG() {
        var db_res = await this.db.query("SELECT UpdateScheme_ThermoStreamer_Svg(" +
            "CAST (" + this.args.id + " AS BIGINT), " +
            "CAST ('" + this.args.svg_file + "' AS TEXT), " +
            "CAST ('" + dateTimeToSQL(new Date(Date.now())) + "' AS TIMESTAMP))")
        var result: SchemeThermoStreamerSvgEntity[] = new Array();
        for (var p in db_res.rows) { result.push(db_res.rows[p]); }
        return result;
    }

}