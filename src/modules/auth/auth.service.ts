import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const loginWithEmailAndPassFromDB = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User doesn't exist");
  }

  if (password !== user.password) {
    throw new Error("Password didn't matched");
  } else {
    const { password, ...userData } = user;
    return userData;
  }
};

const authWithGoogleFromDB = async (data: Prisma.UserCreateInput) => {
  let user = await prisma.user.findUnique({
    where: {
      email: data?.email,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data,
    });
  }

  return user;
};

export const AuthService = {
  loginWithEmailAndPassFromDB,
  authWithGoogleFromDB,
};
