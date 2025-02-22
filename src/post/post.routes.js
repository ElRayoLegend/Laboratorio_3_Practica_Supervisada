import { Router } from "express";
import { savePost, getPostsAvailables, getPostById, deletePost, updatePost } from "./post.controller.js";
import { createPostValidator, getPostByIdValidator, updatePostValidator, deletePostValidator, getPostValidator } from "../middlewares/post-validators.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API for managing posts
 */

/**
 * @swagger
 * /gestorOpiniones/v1/post/addPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               categorys:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created
 */
router.post("/addPost", createPostValidator, savePost);

/**
 * @swagger
 * /gestorOpiniones/v1/post/findPost/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 */
router.get("/findPost/:id", getPostByIdValidator, getPostById);

/**
 * @swagger
 * /gestorOpiniones/v1/post/getPostAvailables:
 *   get:
 *     summary: Get available posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: limits
 *         schema:
 *           type: integer
 *         description: Limit the number of posts
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Offset for posts
 *     responses:
 *       200:
 *         description: List of available posts
 */
router.get("/getPostAvailables", getPostValidator, getPostsAvailables);

/**
 * @swagger
 * /gestorOpiniones/v1/post/updatePost/{id}:
 *   put:
 *     summary: Update post information
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               categorys:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated
 *       404:
 *         description: Post not found
 */
router.put("/updatePost/:id", updatePostValidator, updatePost);

/**
 * @swagger
 * /gestorOpiniones/v1/post/deletePost/{id}:
 *   delete:
 *     summary: Delete post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */
router.delete("/deletePost/:id", deletePostValidator, deletePost);

export default router;