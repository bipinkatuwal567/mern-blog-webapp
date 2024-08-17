import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createPost,
  getPost,
  deletePost,
} from "../controller/postController.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getpost", getPost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);

export default router;
