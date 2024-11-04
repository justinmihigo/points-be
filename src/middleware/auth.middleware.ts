import jwt, { JwtPayload } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
export interface AuthenticateRequest extends Request{
    userId?:string
}

const VerifyToken = async (req: AuthenticateRequest, res: Response, next: NextFunction): Promise<any> => {

    try {
        const token = req.headers["authorization"];
        const authToken = token?.replace('Bearer ', '');
        if (!authToken) {
            return res.status(401).json({ message: "Token not provided" });
        }
        else{
            const decodedToken = jwt.verify(authToken, "123") as JwtPayload;
            console.log(decodedToken);
            req.userId = decodedToken.userId;
            console.log(req.userId);
            res.status(200);
            return next();
        }
       
    } catch (error) {
        return res.status(403).json({ message: "Token is not valid" });
    }
}
export default VerifyToken;