import express from "express";
import {
  deleteUser,
  getUsers,
  test,
  updateUser,
} from "../controller/userController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getusers", verifyToken, getUsers);

export default router;
