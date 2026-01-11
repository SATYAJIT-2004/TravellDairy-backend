import express from "express";
import { getUser, signout } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router()

router.get("/getusers",verifyToken, getUser)
router.post("/signout",signout)
export default router