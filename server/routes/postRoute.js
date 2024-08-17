import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { createPost, getPost } from "../controller/postController.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getpost", getPost);

export default router;
