'use strict';

import jwt from "jsonwebtoken";
import Post from './post.model.js';
import Category from '../category/category.model.js';
import User from '../user/user.model.js'

export const savePost = async (req, res) => {
    try {
        const { title, categorys, text, users } = req.body;

        if (!users) {
            return res.status(400).json({ message: "El ID del usuario es obligatorio" });
        }

        const userExists = await User.findById(users);
        if (!userExists) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const categoryId = categorys || "67ad0a98a2a5eeaa2dd27999";
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const newPost = new Post({
            title,
            categorys: categoryId,
            users,
            text
        });

        await newPost.save();

        if (categoryId !== "67ad0a98a2a5eeaa2dd27999") {
            category.posts.push(newPost._id);
            await category.save();
        }

        res.status(200).json({
            success: true,
            message: "Publicación guardada y categoría actualizada",
            product: newPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar la publicación",
            error: error.message
        });
    }
};


export const getPostsAvailables = async(req, res) => {
    try {
        const { limits = 10, from = 0 } = req.query;

        const query = { status: "AVAILABLE" };

        const [total, posts] = await Promise.all([
            Post.countDocuments(query),
            Post.find(query)
                .skip(Number(from))
                .limit(Number(limits))
                .populate("categorys", "name") 
        ]);

        return res.status(200).json({
            success: true,
            total,
            posts
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las publicaciones",
            error: err.message
        });
    }
};

export const getPostById = async(req, res) => {
    try{
        const { id } = req.params
        const post = await Post.findById(id)

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Publicacion no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            post
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener la publicacion",
            error: err.message
        })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No estás autenticado" });
        }

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log("Decoded Token:", decoded);

        const userId = decoded.uid;
        if (!userId) {
            return res.status(403).json({ message: "No se pudo obtener el ID del usuario desde el token" });
        }

        const post = await Post.findById(id).populate("users");
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        if (!post.users) {
            return res.status(400).json({ message: "La publicación no tiene un usuario asignado" });
        }

        console.log("User ID from token:", userId);
        console.log("User ID from post:", post.users._id.toString());

        if (post.users._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "No tienes permiso para eliminar esta publicación" });
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Publicación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: error.message
        });
    }
};


export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, categorys, text } = req.body;
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No estás autenticado" });
        }

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log("Decoded Token:", decoded);

        const userId = decoded.uid;
        if (!userId) {
            return res.status(403).json({ message: "No se pudo obtener el ID del usuario desde el token" });
        }

        const post = await Post.findById(id).populate("users");
        if (!post) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        if (!post.users) {
            return res.status(400).json({ message: "La publicación no tiene un usuario asignado" });
        }

        console.log("User ID from token:", userId);
        console.log("User ID from post:", post.users._id.toString());

        if (post.users._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "No tienes permiso para actualizar esta publicación" });
        }

        let updateData = {};
        if (title) updateData.title = title;
        if (categorys) updateData.categorys = categorys;
        if (text) updateData.text = text;

        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({
            message: "Publicación actualizada correctamente",
            post: updatedPost
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la publicación",
            error: error.message
        });
    }
};
