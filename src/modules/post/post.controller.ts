import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.createPostFromDB(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
      : undefined;

    const sortBy = (req.query.sortBy as string) || undefined;
    const sortOrder = (req.query.sortOrder as string) || undefined;

    const tags = req.query.tags ? (req.query.tags as string)?.split(",") : [];

    const result = await PostService.getAllPostFromDB({
      page,
      limit,
      search,
      isFeatured,
      tags,
      sortBy,
      sortOrder,
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await PostService.getSinglePostFromDB(Number(id));

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.updatePostFromDB(
      Number(req.params.id),
      req.body
    );

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.deletePostFromDB(Number(req.params.id));

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const PostController = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
};
