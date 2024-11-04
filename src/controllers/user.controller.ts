import User from "../models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const { fullname, email, phoneNumber } = req.body;
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ userId: user._id }, '123', {
            expiresIn: '3h'
        })
        res.status(201).json({
            message: "User created successfully",
            user, token
        })
        console.log(token);
    } catch (error) {
        console.log("error", error)
    }
}

export const getUsers = async (req: Request, res: Response): Promise<any> => {

    try {
        const user = await User.find();
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log("error", error)
    }
}
export const getToken = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.headers['authorization'];
        if (token) {
            res.status(200).json(token);
        }
        else {
            res.status(400).json({ message: 'token not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error })
    }
}
export const getUser = async (req: Request, res: Response): Promise<any> => {
    try {
        if (req.params.id) {
            const user = await User.findOne({ _id: req.params.id })
            return res.status(200).json(user)
        }
        else {
            return res.status(401).json({ message: "Not authenticated" })
        }

    }
    catch (error) {
        return res.status(500).json(error)
    }
}