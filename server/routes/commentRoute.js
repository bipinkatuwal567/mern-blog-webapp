import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createComment,
  editComment,
  getComments,
  likeComment,
} from "../controller/commentController.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getPostComments/:postId", getComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);

export default router;
