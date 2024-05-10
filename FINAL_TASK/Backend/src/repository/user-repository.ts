import { FullUserModel, UserModel } from "../models/user";
import { DBConnection, DBPool, SqlBuilder } from "../utils/sql-builder";
import { Mapper } from "../utils/mapper";
import { randBigInt } from "../utils/uuid-int";
import { Inject } from "typescript-ioc";
import { UserRepository } from "../repo-base/user-repository";

export class MySqlUserRepository extends UserRepository {
    private conn: DBConnection
    constructor(@Inject pool: DBPool) {
        super();
        this.conn = pool.connect();
    }
    async list(): Promise<Array<UserModel>> {
        const [rows, ] = await this.conn.query("SELECT * FROM user");
        const mapper = new Mapper<UserModel>();
        return (rows as any[]).map(x => mapper.createFrom(x, [], [
            "token",
            "token_date",
            "password",
        ]));
    }
    async getone(userId: string): Promise<UserModel | null> {
        const [rows, ] = await this.conn.query("SELECT * FROM user WHERE user_id = ?;", [userId]);
        const mapper = new Mapper<UserModel>();

        return (rows as any[]).map(x => mapper.createFrom(x, [], [
            "token",
            "token_date",
            "password",
        ]))[0] || null;
    }
    async existsone(userId: string): Promise<boolean> {
        const [rows, ] = await this.conn.query("SELECT 1 as test FROM user WHERE user_id = ?;", [userId]);
        return (rows as any[]).length == 1;
    }
    async create(user: UserModel): Promise<UserModel | null> {
        user.userId = user.userId || randBigInt();
        let existing = await this.existsone(user.userId)
        if (!existing) {
            let sql = new SqlBuilder(user).addDefaultMapping()
                .addKeyFromDefaultMapping(["userId"])
                .buildInsert("user");
            await this.conn.execute(sql.sql as string, sql.params);
            return this.getone(user.userId);
        }
        return null;
    }
    async update(user: UserModel | FullUserModel): Promise<UserModel | null> {
        user.userId = user.userId || randBigInt();
        let existing = await this.getone(user.userId)
        if (existing) {
            let sql = new SqlBuilder(user).addDefaultMapping()
                .addKeyFromDefaultMapping(["userId"])
                .buildUpdate("user");

            await this.conn.execute(sql.sql as string, sql.params);
            return this.getone(user.userId);
        }
        return null;
    }
    async getByEmailWithSensitiveInfo(email: string): Promise<FullUserModel | null> {
        const [rows, ] = await this.conn.query("SELECT * FROM user WHERE email = ?;", [email]);
        const mapper = new Mapper<FullUserModel>();
        return (rows as any[]).map(x => mapper.createFrom(x))[0] || null;
    }
    async updateToken(userId: string, token: string): Promise<boolean> {
        let date = new Date();
        await this.conn.execute("UPDATE user SET token = ?, token_date = ? WHERE user_id = ?;", [token, date, userId]);
        return true;
    }
}