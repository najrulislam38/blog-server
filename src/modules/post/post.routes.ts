import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.get("/", PostController.getAllPost);
router.get("/status", PostController.getBlogStatus);

router.get("/:id", PostController.getSinglePost);

router.post("/", PostController.createPost);

router.patch("/:id", PostController.updatePost);

router.delete("/:id", PostController.deletePost);

export const PostRouter = router;
