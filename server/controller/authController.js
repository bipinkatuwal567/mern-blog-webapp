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

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  console.log("hey");

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      const token = jwt.sign({ id: userExist.id }, process.env.JWT_SECRET_KEY);

      const { password, ...restData } = userExist._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(restData);
    } else {
      console.log("Hello");

      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY);

      const { password: pass, ...restData } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(restData);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User has been sign out");
  } catch (error) {
    next(error);
  }
};
