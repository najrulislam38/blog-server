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
    const result = await PostService.getAllPostFromDB();

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
