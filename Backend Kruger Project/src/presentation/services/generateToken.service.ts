import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { UserEntity, UserRol } from "../../domain/entities/user.entity";

dotenv.config();

interface JwtPayload {
  idCard: string;
  role: UserRol;
}

export const generateToken = (user: UserEntity): string => {
  const payload: JwtPayload = {
    idCard: user.idCard,
    role: user.role,
  };

  // Asegúrate de que JWT_SECRET esté configurado
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en las variables de entorno");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Simulación de validación del usuario
  // Aquí deberías usar lógica para buscar al usuario en la base de datos

  const mockUserObject = {
    idCard: "1234567890",
    coordinates: [1, 1],
    names: "John",
    surnames: "Doe",
    mail: "john.doe@example.com",
    role: UserRol.ADMIN,
    username: "admin",
    password: "admin123",
  };

  const mockUserObject2 = {
    idCard: "1234567890",
    coordinates: [1, 1],
    names: "John",
    surnames: "Doe",
    mail: "john.doe@example.com",
    role: UserRol.CLIENT,
    username: "client",
    password: "client123",
  };

  const user = UserEntity.fromObject(mockUserObject2);

  // Validación de las credenciales (simulada)
  if (user.username !== username || user.password !== password) {
    res.status(401).json({ error: "Credenciales inválidas" });
    return;
  }

  const token = generateToken(user);
  console.log(token);
  res.json({ access_token: token });
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: Function
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ error: "Token no proporcionado o inválido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Agregar la información del usuario al objeto `req` para usarla en endpoints posteriores
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export const requireRole = (role: UserRol) => {
  return (req: Request, res: Response, next: Function): void => {
    const user = req.body.user as JwtPayload;
    if (user.role !== role) {
      res.status(403).json({ error: "Acceso denegado" });
      return;
    }
    next();
  };
};
