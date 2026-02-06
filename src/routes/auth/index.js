import { Router } from "express";
import { User } from "./model.js";
import { LoginValidationSchema, SignupValidationSchema } from "./validation.js";
import { requireValidation } from "../../middlewares/require-validation.js";

const authRouter = Router();

authRouter.post(
  "/signup",

  requireValidation(SignupValidationSchema),

  async (req, res) => {
    const data = req.parsed;

    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exits",
      });
    }

    const user = await User.create(data);

    return res.status(201).json({
      message: "Welcome",
      data: user,
    });
  },
);

authRouter.post(
  "/login",

  requireValidation(LoginValidationSchema),

  async (req, res) => {
    const data = req.parsed;

    const existingUser = await User.findOne({
      email: data.email,
    });

    if (!existingUser) {
      return res.status(400).json({
        message: "User does not already exits",
      });
    }

    return res.status(201).json({
      message: "Welcome to login",
      data: existingUser,
    });
  },
);

export { authRouter };
