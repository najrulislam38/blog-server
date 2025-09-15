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

export const AuthService = {
  loginWithEmailAndPassFromDB,
};
