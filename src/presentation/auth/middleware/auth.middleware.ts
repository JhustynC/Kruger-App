import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../../config/data/postgres";

// Middleware para verificar autenticación
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.redirect("/auth/login");
}

// Middleware para verificar si el correo está registrado
export async function isEmailRegistered(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email = (req.user as any)?.email;
  const user = await prisma.user.findFirst({
    where: {
      mail: email,
    },
  });
  if (user) {
    return next();
  }
  res.status(403).send("Access denied: Email not registered.");
}
