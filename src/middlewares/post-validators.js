import { body, param } from "express-validator";
import { postExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createPostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("text").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
];

export const getPostByIdValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(postExists),
    validarCampos,
    handleErrors
];

export const getPostValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const updatePostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(postExists),
    body("title").optional().notEmpty().withMessage("El titulo es requerido"),
    body("text").optional().notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
];

export const deletePostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(postExists),
    validarCampos,
    handleErrors
];
