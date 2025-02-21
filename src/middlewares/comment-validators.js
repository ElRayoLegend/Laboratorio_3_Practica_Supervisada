import { body, param } from "express-validator";
import { commentExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    body("text").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
];

export const getCommentByPostValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(commentExists),
    validarCampos,
    handleErrors
];

export const updateCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(commentExists),
    body("text").optional().notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
];

export const deleteCommentValidator = [
    validateJWT,
    hasRoles("USER_ROLE"),
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(commentExists),
    validarCampos,
    handleErrors
];
