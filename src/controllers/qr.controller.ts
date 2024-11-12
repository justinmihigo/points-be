import QrCodeModel from "../models/qrcode.model";
import { Request, Response } from "express";
import CryptoJS, { AES } from "crypto-js"
import { config } from "dotenv";
import * as QRCode from "qrcode";
import Cloudinary from "../utils/cloudinary.config";
config();
const SECRET_KEY = process.env.SECRET_KEY || "";
let cypherText: any;
export const createQrCode = async (req: Request, res: Response): Promise<any> => {
    const { data, name, points } = req.body;
    try {
        if (data) {
            cypherText = AES.encrypt(data as string, SECRET_KEY);
        }
        const qrcode = new QrCodeModel(req.body);
        await qrcode.save();

        const qrCode = await QRCode.toDataURL(qrcode._id.toString(),{
            width: 600
        });
        const uploadedImage= await Cloudinary.uploader.upload(qrCode,{
            overwrite: true,
        });
        // res.send(`<img src="${qrCode} "alt= "qrcode">`)
        res.send(uploadedImage.secure_url);
        // res.status(201).send().json({
        //     message: "Qrcode created successfully",
        //     qrcode,
        // })
    } catch (error) {
        console.log("error", error);
    }
}

export const getQrs = async (req: Request, res: Response): Promise<any> => {
    try {
        const qrcodes = await QrCodeModel.find();
        res.status(200).json({
            qrcodes
        })
    } catch (error) {
        console.log("error", error);
    }
}

export const getQrById = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    try {
        const qrcode = await QrCodeModel.findById(id);
        res.status(200).json({
            qrcode
        })
    } catch (error) {
        console.log("error", error);
    }
}