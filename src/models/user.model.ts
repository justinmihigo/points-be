import { Schema, model } from "mongoose";
import { IUser } from "../types/user.types";

const UserSchema = new Schema<IUser>({
    fullname: { type: String, required: true },
    phone: { type: String, required: true},
    email: { type: String},
    gender: {type: String},
    status: { type: String, default: "inactive" },
    hasScanned: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IUser>("User", UserSchema);