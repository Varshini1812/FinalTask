import mysql from "mysql2/promise";
import config from "config";
import { Singleton } from "typescript-ioc";
import { logger } from "./app-logger";
import { color } from "./color-console";

export type SQLObject = { sql: string | null, params: Array<any> };

export type DBConnection = mysql.Pool;

let lastPool: DBConnection | null = null;

@Singleton
export class DBPool {
    private conn: mysql.Pool | null = null;
    connect(): mysql.Pool {
        if (!lastPool) {
            let connName = config.get("db.name") as any;
            let options: mysql.PoolOptions = Object.assign({}, {
                bigNumberStrings: true,
                supportBigNumbers: true,
            }, config.get("db.options"));
            this.conn = mysql.createPool(options);
            lastPool = this.conn;
            logger.info(`${color.FgGreen}Connected to DB : Config Name : ${connName}${color.Reset}`);
        } else {
            this.conn = lastPool
        }
        return this.conn as mysql.Pool;
    }

    disconnect(): void {
        if (!lastPool) {
            this.conn!.end();
            lastPool = null;
        }
    }
}

export function finalizeDB() {
    if (lastPool != null) {
        lastPool!.end();
    }
}
export class SqlBuilder<T> {
    private maps: Array<[string, string]> = [];
    private keys: Array<[string, string]> = [];
    constructor(private obj: T) { }
    private add(x: string, y: string): void {
        if (!this.maps.find(p => p[0] == x)) {
            this.maps.push([x, y])
        }
    }
    private remove(x: string, addToKey = false): void {
        let index = this.maps.findIndex(p => p[0] == x);
        if (index > -1) {
            let r = this.maps.splice(index, 1);
            if (addToKey) {
                if (!!r) {
                    this.addKey(r[0][0], r[0][1]);
                } else {
                    throw new Error("Open Mapping is not done or no matching is found");
                }
            }
        }
    }
    private addKey(x: string, y: string): void {
        if (!this.keys.find(p => p[0] == x)) {
            this.keys.push([x, y])
        }
    }
    /*
    private removeKey(x: string): void {
        let index = this.keys.findIndex(p => p[0] == x);
        if (index > -1) {
            this.keys.splice(index, 1);
        }
    }
    */
    addDefaultMapping(): SqlBuilder<T> {
        Object.keys(this.obj as any)
            .map(x => [x, x.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase())])
            .forEach(x => this.add(x[0], x[1]));
        return this;
    }
    addOpenMapping<T1 extends (string & keyof T)>(maps: Array<[T1, string]>): SqlBuilder<T> {
        maps.forEach(x => this.add(x[0], x[1]));
        return this;
    }
    exclude<T1 extends (string & keyof T)>(list: Array<T1>): SqlBuilder<T> {
        list.forEach(x => this.remove(x, false));
        return this;
    }
    addKeyFromDefaultMapping<T1 extends (string & keyof T)>(list: Array<T1>): SqlBuilder<T> {
        list.forEach(x => this.remove(x, true));
        return this;
    }
    addKeyOpenMapping<T1 extends (string & keyof T)>(maps: Array<[T1, string]>): SqlBuilder<T> {
        maps.forEach(x => {
            this.remove(x[0], false);
            this.addKey(x[0], x[1]);
        })
        return this;
    }
    buildUpdate(tableName: string): SQLObject {
        let sqlObj: SQLObject = { sql: null, params: [] };
        let fieldStr = "UPDATE " + tableName + " SET ";
        let paramsArray = [];
        let delimiter = "";

        for (const oneitem of this.maps) {
            paramsArray.push((this.obj as any)[oneitem[0]]);
            fieldStr = fieldStr + delimiter + oneitem[1] + " = ? \n ";
            delimiter = ", "
        }
        fieldStr = fieldStr + " WHERE \n"
        delimiter = ""
        for (const oneitem of this.keys) {
            paramsArray.push((this.obj as any)[oneitem[0]]);
            fieldStr = fieldStr + delimiter + oneitem[1] + " = ?";
            delimiter = ", "
        }
        fieldStr = fieldStr + "; "
        sqlObj.sql = fieldStr;
        sqlObj.params = paramsArray;
        return sqlObj;
    }

    buildInsert(tableName: string): SQLObject {
        let sqlObj: SQLObject = { sql: null, params: [] };
        let fieldStr = "INSERT INTO " + tableName + " ( ";
        let selectStr = "SELECT ";
        let paramsArray = [];
        let delimiter = "";
        let subSelect = " NOT EXISTS ( SELECT * FROM " + tableName + " WHERE ";
        for (const oneitem of this.keys) {
            paramsArray.push((this.obj as any)[oneitem[0]]);
            fieldStr = fieldStr + delimiter + oneitem[1];
            selectStr = selectStr + delimiter + "? as " + oneitem[1];
            delimiter = ", "
        }

        for (const oneitem of this.maps) {
            paramsArray.push((this.obj as any)[oneitem[0]]);
            fieldStr = fieldStr + delimiter + oneitem[1];
            selectStr = selectStr + delimiter + "? as " + oneitem[1];
            delimiter = ", "
        }

        delimiter = ""
        for (const oneitem of this.keys) {
            paramsArray.push((this.obj as any)[oneitem[0]]);
            subSelect = subSelect + delimiter + oneitem[1] + " = ? ";
            delimiter = ", "
        }
        fieldStr = fieldStr + " ) \n" + selectStr + "\n WHERE " + subSelect + " ); "
        sqlObj.sql = fieldStr;
        sqlObj.params = paramsArray;
        return sqlObj;
    }
}