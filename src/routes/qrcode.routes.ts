import { Router } from "express";
import { createQrCode, getQrById, getQrs } from "../controllers/qr.controller";

const router= Router();

router.post("/generate", createQrCode);
router.get("/getQr/:id", getQrById);
router.get("/getAll", getQrs);

export default router;