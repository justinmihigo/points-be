import User from "../models/user.model";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const { fullname, email, phoneNumber } = req.body;
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ userId: user._id }, '123', {
            expiresIn: '20h'
        })
        res.status(201).json({
            message: "User created successfully",
            user, token
        })
        console.log(token);
    } catch (error) {
        res.status(500).json({ error });
        console.log("error", error)
    }
}

export const getUsers = async (req: Request, res: Response): Promise<any> => {

    try {
        const userActive = await User.aggregate([
            {
                $sort: { points: -1 }
            },
            {
                $match:{
                    status:"active",
                }
            },
            {
                $group: {
                    _id: { gender: "$gender" },
                    users: { $push: { fullname: "$fullname", points: "$points", gender:"$gender", status:"$status" } }
                }
            },
            {
                $limit: 3
            }
        
        ]);
            const UserInactive= await User.aggregate([ {
                $sort: { points: -1 }
            },
            {
                $match:{
                    status:"inactive",
                }
            },
            {
                $group: {
                    _id: { gender: "$gender" },
                    users: { $push: { fullname: "$fullname", points: "$points", gender:"$gender", status:"$status" } }
                },
            },
            {
                $limit: 3
            }
        ]);
        res.status(200).json({
            activeUsers: userActive,
            inactiveUsers: UserInactive
        })
    } catch (error) {
        console.log("error", error)
    }
}
export const getAllUsers= async(req:Request, res:Response):Promise<any>=>{
    try {
        const users = await User.find().sort({points:'desc'});
        res.status(200).json(users);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error });
    }
}
export const getTopUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await User.find().limit(10).sort({ points: 'desc' });
        if (users) {
            res.status(200).json({
                users
            })
        }
        else {
            res.status(404).json({ message: "No users found" });
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ error });
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

export const updateUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        console.log(req.body);
        const user = await User.findByIdAndUpdate({ _id: userId }, req.body, { new: true });
        if (user) {
            user.updatedAt = new Date();
            user.save();
            return res.status(200).json(user)
        }
        else {
            return res.status(400).json({ message: 'No user found' });
        }

    } catch (error) {
        return res.status(500).json(error)
    }

}