import { Router } from "express";
import { User } from "./model.js";
import { LoginValidationSchema, SignupValidationSchema } from "./validation.js";
import { requireValidation } from "../../middlewares/require-validation.js";
import jwt from "jsonwebtoken";

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
      password: data.password
    }).select("-password");

    if (!existingUser) {
      return res.status(400).json({
        message: "User does not already exits",
      });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    return res.status(201).json({
      message: "Welcome to login",
      data: {
        user: existingUser,
        token,
      },
    });
  },
);

authRouter.get("/me", async (req, res) => {
  const token = req.headers.authorization; // Bearer token

  if (!token) {
    return res.status(401).json({
      message: "Not logged in",
    });
  }

  const [type, jwtToken] = token.split(" ");

  if (!jwtToken) {
    return res.status(401).json({
      message: "Not logged in",
    });
  }

  const payload = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

  const user = await User.findById(payload.userId);

  return res.status(200).json({
    message: "Your profile",
    data: user,
  });
});

export { authRouter };
