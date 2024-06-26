import { FullUserModel, UserModel } from "../models/user";

export abstract class UserRepository {
    abstract list(): Promise<Array<UserModel>>;
    abstract getone(userId: string): Promise<UserModel | null>;
    abstract existsone(userId: string): Promise<boolean>;
    abstract create(user: UserModel): Promise<UserModel | null>;
    abstract update(user: UserModel | FullUserModel): Promise<UserModel | null>;
    abstract getByEmailWithSensitiveInfo(email: string): Promise<FullUserModel | null>;
    
    abstract getByTokenWithSensitiveInfo(token: string): Promise<FullUserModel | null>
    abstract updateToken(userId: string, token: string): Promise<boolean>;
    abstract findByEmail(email: string): Promise<UserModel | null>;
    abstract generateTokens(user: UserModel): { accessToken: string; refreshToken: string };
    abstract storeRefreshToken(userId: string, refreshToken: string): Promise<void>;
}