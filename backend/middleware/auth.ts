import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface User {
      role: string;
      id: string;
    }
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
  return res.redirect(process.env.CLIENT_URL! + "/login");
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
