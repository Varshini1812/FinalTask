import { connectDB, db } from "../connection";

export function initUserSchema() {
    connectDB();

    if (db.models.user) {
        return db.models.user;
    }

    const userSchema = new db.Schema<any>(
        {
            userName: String,
            phone: { type: String, unique: true },
            email: { type: String, unique: true },
            info: Object,
            password: String,
            token: String,
            tokenDate: Date,
        }
    );

    const userModel = db.models.user || db.model<any>("user", userSchema);
    return userModel;
}
