import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithEmailAndPass = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginWithEmailAndPassFromDB(req.body);

    res.status(201).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

const authWithGoogle = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.authWithGoogleFromDB(req.body);

    res.status(201).json(result);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.message });
  }
};

export const AuthController = {
  loginWithEmailAndPass,
  authWithGoogle,
};
