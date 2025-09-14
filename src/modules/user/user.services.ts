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
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          authorId: true,
          tags: true,
          thumbnail: true,
          createdAt: true,
          updatedAt: true,
          view: true,
        },
      },
    },
  });

  return users;
};

const getSingleUserFromDB = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
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

  return user;
};

const updateUserFromDB = async (
  id: number,
  payload: Prisma.UserUpdateInput
) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
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
      posts: {
        select: {
          id: true,
          title: true,
          content: true,
          authorId: true,
          tags: true,
          thumbnail: true,
          createdAt: true,
          updatedAt: true,
          view: true,
        },
      },
    },
  });

  return result;
};

const deleteUserFromDB = async (id: number) => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
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

  return result;
};

export const UserServices = {
  createUserFromDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
