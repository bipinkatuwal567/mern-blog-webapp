import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createPost,
  getPost,
  deletePost,
  updatePost,
} from "../controller/postController.js";

const router = express.Router();

router.post("/create", verifyToken, createPost);
router.get("/getpost", getPost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletePost);
router.put("/updatepost/:postId/:userId", verifyToken, updatePost);


export default router;
