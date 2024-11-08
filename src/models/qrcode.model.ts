import { Schema, model } from "mongoose";
import { IQrcode } from "../types/qrcode.types";

const QrcodeSchema = new Schema<IQrcode>({
    type: { type: String, default: 'registration' },
    name: { type: String, required: true },
    points: { type: Number, default: 500},
    dedicated: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default model<IQrcode>("Qrcode", QrcodeSchema);