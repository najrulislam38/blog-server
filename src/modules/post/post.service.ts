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

const getAllPostFromDB = async ({
  page,
  limit,
  search,
  isFeatured,
  tags,
  sortBy,
  sortOrder,
}: {
  page: number;
  limit: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
  sortBy?: string;
  sortOrder?: string;
}) => {
  const skip = (page - 1) * limit;

  const where: any = {
    AND: [
      search && {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const orderBy: any =
    sortBy && sortOrder
      ? { [sortBy]: sortOrder.toLowerCase() === "desc" ? "desc" : "asc" }
      : { createdAt: "asc" };

  const result = await prisma.post.findMany({
    skip,
    take: limit,
    where,
    orderBy,
  });

  const total = await prisma.post.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: result,
  };
};

const getSinglePostFromDB = async (id: number) => {
  const result = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id },
      data: {
        view: {
          increment: 1,
        },
      },
    });

    // throw new Error("something was wrong!");

    const postData = await tx.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
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
          },
        },
      },
    });

    return postData;
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
