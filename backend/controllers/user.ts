import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../schema/user";
import { catchAsync } from "../lib/error";

type UserPayload = {
  email: string;
  password: string;
  name: string;
  avatar?: string;
  address?: string;
};

const create = catchAsync(
  async (req: Request<{}, {}, UserPayload>, res: Response) => {
    const { email, password, name, avatar, address } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide required fields" });
    }

    const isUserExist = await User.findOne({
      $or: [{ email }, { name }],
    });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exist" });
    }

    const user = await User.create({ email, password, name, avatar, address });

    if (user) {
      return res.status(201).json({ message: "User created successfully" });
    }

    return res.status(400).json({ message: "Something went wrong" });
  }
);

const profile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const user = await User.findById(userId);
  return res.status(200).json({ message: `Welcome back ${user?.name}`, user });
});

const verifyMail = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const user = await User.findById(userId);
  if (!user?.email) {
    return res.status(404).json({ message: "User doesn't have any mail" });
  }
  if (user.emailVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  // TODO: send mail logic
  return res.status(200).json({ message: "Verification mail sent" });
});

const successVerifyMail = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }
  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
    type Decoded = typeof decoded & { email: string };
    const user = await User.findOne({ email: (decoded as Decoded).email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.emailVerified = true;
    await user.save();
    // TODO: send mail logic
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
});

export { create, profile, verifyMail, successVerifyMail };
