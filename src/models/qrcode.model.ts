import { Schema, model } from "mongoose";
import { IQrcode } from "../types/qrcode.types";

const QrcodeSchema = new Schema<IQrcode>({
    isScanned: { type: Boolean, default: false },
    data: { type: String, required: true },
    type: { type: String, default: "registration"}
});

export default model<IQrcode>("Qrcode", QrcodeSchema);