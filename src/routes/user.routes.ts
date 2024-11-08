import { Router } from "express";
import { createUser, getAllUsers, getToken, getTopUsers, getUser, getUsers, updateUser } from "../controllers/user.controller";
import VerifyToken from "../middleware/auth.middleware";
const router = Router();

router.post("/register", createUser);

router.get("/getUsers",getUsers);

router.get('/getAllUsers',getAllUsers);

router.get("/getUser/:id", VerifyToken, getUser);

router.get("/token",getToken);

router.get("/top10", getTopUsers);

router.patch("/updateUser/:id", VerifyToken, updateUser);

export default router;