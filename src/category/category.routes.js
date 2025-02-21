import { Router } from "express";
import { getAllCategorys, createCategory, updateCategory, deleteCategory} from "./category.controller.js";
import { createCategoryValidator, getCategoryByIdValidator, updateCategoryValidator, deleteCategoryValidator } from "../middlewares/category-validators.js";


const router = Router()

router.get("/", getAllCategorys)

router.post("/createCategory", createCategoryValidator, createCategory)

router.delete("/deleteCategory/:categoryId", deleteCategoryValidator, deleteCategory)

router.put("/updateCategory/:categoryId", updateCategory, updateCategory)

export default router