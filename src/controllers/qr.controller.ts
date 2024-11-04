import QrCode from "../models/qrcode.model";
import { Request, Response } from "express";
import CryptoJS, {AES} from "crypto-js"
import { config } from "dotenv";
config();
const SECRET_KEY = process.env.SECRET_KEY || "";
let cypherText:any;
export const createQrCode= async (req: Request, res: Response):Promise<any>=>{
    const { data, type}= req.body;
    try {
        if(data){
         cypherText= AES.encrypt(data as string,SECRET_KEY);
        }
        const qrcode= new QrCode({ cypherText, type });
        await qrcode.save();
        res.status(201).json({
            message: "Qrcode created successfully",
            qrcode
        })
    } catch (error) {
        console.log("error", error);
    }
}

export const getQrs= async (req: Request, res: Response):Promise<any>=>{
    try {
        const qrcodes= await QrCode.find();
        res.status(200).json({
            qrcodes
        })
    } catch (error) {
        console.log("error", error);
    }
}

export const getS= async (req: Request, res: Response):Promise<any>=>{
    try {
        const qrcodes= await QrCode.find();
        res.status(200).json({
            qrcodes
        })
    } catch (error) {
        console.log("error", error);
    }
}