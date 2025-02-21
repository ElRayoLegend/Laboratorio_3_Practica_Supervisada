import { Router } from "express";
import { savePost, getPostsAvailables, getPostById, deletePost, updatePost } from "./post.controller.js";
import { createPostValidator, getPostByIdValidator, updatePostValidator, deletePostValidator, getPostValidator } from "../middlewares/post-validators.js";

const router = Router();

router.post("/addPost", createPostValidator, savePost);

router.get("/findPost/:id", getPostByIdValidator, getPostById);

router.get("/getPostAvailables", getPostValidator, getPostsAvailables);

router.put("/updatePost/:id", updatePostValidator, updatePost);

router.delete("/deletePost/:id", deletePostValidator, deletePost);

export default router;