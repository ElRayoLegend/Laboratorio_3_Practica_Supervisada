import { Router } from "express";
import { getAllCategorys, createCategory, updateCategory, deleteCategory} from "./category.controller.js";
import { createCategoryValidator, getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /gestorOpiniones/v1/category:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/", getAllCategorys);

/**
 * @swagger
 * /gestorOpiniones/v1/category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post("/createCategory", createCategoryValidator, createCategory);

/**
 * @swagger
 * /gestorOpiniones/v1/category/{categoryId}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete("/deleteCategory/:categoryId", deleteCategoryValidator, deleteCategory);

/**
 * @swagger
 * /gestorOpiniones/v1/category/{categoryId}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Category not found
 */
router.put("/updateCategory/:categoryId", updateCategoryValidator, updateCategory);

export default router;