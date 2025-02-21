import express from "express";
import { createComment, updateComment, deleteComment, getCommentsByPost } from "../comment/comment.controller.js";
import { createCommentValidator, getCommentByPostValidator, updateCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

const router = express.Router();

router.post("/createComment", createComment, createCommentValidator);

router.put("/updateComment/:id", updateComment, updateCommentValidator);

router.delete("/deleteComment/:id", deleteComment, deleteCommentValidator);

router.get("/getComments/:postId", getCommentsByPost, getCommentByPostValidator);

export default router;
