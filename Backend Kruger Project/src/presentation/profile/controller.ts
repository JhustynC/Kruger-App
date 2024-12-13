import { Request, Response } from "express";

export class ProfileController {
  public profile = (req: Request, res: Response) => {
    res.send(
      `Welcome ${
        req.user && (req.user as any).displayName
          ? (req.user as any).displayName
          : (req.user as any).names
      }`
    );
  };
}
