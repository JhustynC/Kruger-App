import "dotenv/config";
import { NextFunction, Request, Response } from "express";

export async function isRoleAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRole = (req.user as any)?.role;
  console.log(userRole);
  if (userRole === "ADMIN") {
    return next();
  }
  res.status(403).send("Access denied for clients");
}
