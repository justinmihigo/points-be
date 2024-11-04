import { Router } from "express";
import { createUser, getToken, getUser, getUsers } from "../controllers/user.controller";
import VerifyToken from "../middleware/auth.middleware";
const router = Router();

router.post("/register", createUser);

router.get("/getUsers",getUsers);

router.get("/getUser/:id", VerifyToken, getUser);

router.get("/token",getToken);

export default router;