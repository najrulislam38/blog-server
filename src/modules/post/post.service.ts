import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createPostFromDB = async (
  payload: Prisma.PostCreateInput
): Promise<Post> => {
  const result = await prisma.post.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });

  return result;
};

const getAllPostFromDB = async () => {
  const result = await prisma.post.findMany();

  return result;
};

const getSinglePostFromDB = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updatePostFromDB = async (
  id: number,
  payload: Prisma.PostUpdateInput
) => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deletePostFromDB = async (id: number) => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PostService = {
  createPostFromDB,
  getAllPostFromDB,
  getSinglePostFromDB,
  updatePostFromDB,
  deletePostFromDB,
};
