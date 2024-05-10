import { FullUserModel, UserModel } from "../../models/user";
import { UserRepository } from "../../repo-base/user-repository";
import { initUserSchema } from "../models/user";
import mongoose from "mongoose";

export class MongoUserRepository extends UserRepository {
    private mongoModel = initUserSchema();
    async list(): Promise<Array<UserModel>> {
        const rows = await this.mongoModel.find()
            .select({ userId: "$_id", userName: 1, phone: 1, email: 1, info: 1, _id: 0 }).lean().exec();
        return rows as UserModel[];
    }
    async getone(userId: string): Promise<UserModel | null> {
        const row = await this.mongoModel.findById(userId)
            .select({ userId: "$_id", userName: 1, phone: 1, email: 1, info: 1, _id: 0 }).lean().exec();
        return row || null;
    }
    async existsone(userId: string): Promise<boolean> {
        const row = await this.mongoModel.exists({ _id: userId });
        return !!row;
    }
    async create(user: UserModel): Promise<UserModel | null> {
        let dbUser = user as any;
        dbUser._id = (new mongoose.Types.ObjectId()).toString();
        let existing = await this.existsone(dbUser._id || "");
        if (!existing) {
            delete dbUser.userId;
            await this.mongoModel.create(dbUser);
            return this.getone(dbUser._id);
        }
        return null;
    }
    async update(user: UserModel | FullUserModel): Promise<UserModel | null> {
        let dbUser = user as any;
        let existing = await this.getone(user.userId || "");
        if (existing) {
            dbUser._id = dbUser.userId
            delete dbUser.userId;
            await this.mongoModel.findByIdAndUpdate(dbUser._id, dbUser);
            return this.getone(dbUser._id);
        }
        return null;
    }
    async getByEmailWithSensitiveInfo(email: string): Promise<FullUserModel | null> {
        const row = await this.mongoModel.findOne({ email: email })
            .select({
                userId: "$_id",
                userName: 1,
                phone: 1,
                email: 1,
                info: 1,
                password: 1,
                token: 1,
                tokenDate: 1,
                _id: 0,
            }).lean().exec();
        return row || null;
    }
    async updateToken(userId: string, token: string): Promise<boolean> {
        let date = new Date();
        await this.mongoModel.findByIdAndUpdate(userId, { token: token, tokenDate: date });
        return true;
    }
}