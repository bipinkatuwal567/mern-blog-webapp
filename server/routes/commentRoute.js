import express from "express";
import verifyToken from "../utils/verifyToken.js";
import { createComment, getComments } from "../controller/commentController.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getComments);

export default router;
