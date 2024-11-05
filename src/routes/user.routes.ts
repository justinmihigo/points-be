import { Router } from "express";
import { createUser, getToken, getUser, getUsers, updateUser } from "../controllers/user.controller";
import VerifyToken from "../middleware/auth.middleware";
const router = Router();

router.post("/register", createUser);

router.get("/getUsers",getUsers);

router.get("/getUser/:id", VerifyToken, getUser);

router.get("/token",getToken);

router.patch("/updateUser/:id", VerifyToken, updateUser);

export default router;