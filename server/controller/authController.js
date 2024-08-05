import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Signup Succesfull");
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required!"));
  }

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return next(errorHandler(400, "User credential is invalid!"));
    }

    const validPassword = bcryptjs.compareSync(password, userExist.password);

    if (!validPassword) {
      return next(errorHandler(400, "User credential is invalid!"));
    }

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET_KEY);

    const { password: pass, ...restData } = userExist._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(restData);
  } catch (error) {
    next(error);
  }
};
