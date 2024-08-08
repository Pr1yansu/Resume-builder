import type { NextFunction, Request, Response } from "express";
import type { UserDocument } from "../schema/user";

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}

export const checkAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res
    .status(401)
    .json({ message: "You need to login first", redirect: "/login" });
};

export const checkRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    }
    return res
      .status(401)
      .json({ message: "You can not access this resource" });
  };
};
