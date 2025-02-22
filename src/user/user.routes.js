import { Router } from "express"
import { getUserById, getUsers, updatePassword, updateUser, updateProfilePicture } from "./user.controller.js"
import { getUserByIdValidator, updatePasswordValidator, updateUserValidator, updateProfilePictureValidator, getUserValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /gestorOpiniones/v1/user/{uid}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:uid", getUserByIdValidator, getUserById)

/**
 * @swagger
 * /gestorOpiniones/v1/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Limit the number of users
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Offset for users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", getUserValidator, getUsers)

/**
 * @swagger
 * /gestorOpiniones/v1/user/updatePassword/{uid}:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: New password cannot be the same as the old password
 *       404:
 *         description: User not found
 */
router.put("/updatePassword/:uid", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /gestorOpiniones/v1/user/updateUser/{uid}:
 *   put:
 *     summary: Update user information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 */
router.put("/updateUser/:uid", updateUserValidator, updateUser)

/**
 * @swagger
 * /gestorOpiniones/v1/user/updateProfilePicture/{uid}:
 *   put:
 *     summary: Update user profile picture
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       400:
 *         description: No file in the request
 *       404:
 *         description: User not found
 */
router.put("/updateProfilePicture/:uid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router
