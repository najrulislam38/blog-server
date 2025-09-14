import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.post("/", UserController.createUser);

export const UserRouter = router;
