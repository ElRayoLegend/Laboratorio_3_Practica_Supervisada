import express from "express";
import { createComment, updateComment, deleteComment, getCommentsByPost } from "../comment/comment.controller.js";
import { createCommentValidator, getCommentByPostValidator, updateCommentValidator, deleteCommentValidator } from "../middlewares/comment-validators.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API for managing comments
 */

/**
 * @swagger
 * /gestorOpiniones/v1/comment/createComment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               post:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 */
router.post("/createComment", createCommentValidator, createComment);

/**
 * @swagger
 * /gestorOpiniones/v1/comment/updateComment/{id}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       404:
 *         description: Comment not found
 */
router.put("/updateComment/:id", updateCommentValidator, updateComment);

/**
 * @swagger
 * /gestorOpiniones/v1/comment/deleteComment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       404:
 *         description: Comment not found
 */
router.delete("/deleteComment/:id", deleteCommentValidator, deleteComment);

/**
 * @swagger
 * /gestorOpiniones/v1/comment/getComments/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Comments retrieved
 *       404:
 *         description: Comments not found
 */
router.get("/getComments/:postId", getCommentByPostValidator, getCommentsByPost);

export default router;
