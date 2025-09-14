import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUserFromDB = async (
  payload: Prisma.UserCreateInput
): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: payload,
  });

  return createdUser;
};

const getAllUserFromDB = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      age: true,
      phone: true,
      picture: true,
      role: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      posts: true,
    },
  });

  return users;
};

export const UserServices = {
  createUserFromDB,
  getAllUserFromDB,
};
