import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await UserServices.createUserFromDB(payload);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(Number(id));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.updateUserFromDB(Number(id), req.body);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserServices.deleteUserFromDB(Number(id));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
