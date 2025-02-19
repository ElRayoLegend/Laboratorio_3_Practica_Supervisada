'use strict';

import Post from './post.model.js';
import Category from '../category/category.model.js';

export const savePost = async (req, res) => {
    try {
        const { title, categorys, text } = req.body;

        const categoryId = categorys || "67ad0a98a2a5eeaa2dd27999";

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const newPost = new Post({
            title,
            categorys: categoryId,
            text
        });

        await newPost.save();

        if (categoryId !== "67ad0a98a2a5eeaa2dd27999") {
            category.posts.push(newPost._id);
            await category.save();
        }

        res.status(200).json({
            success: true,
            message: "Publicacion guardada y categoría actualizada",
            product: newPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar la publicacion",
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
    try{
        const { id } = req. params

        const product =  await Product.findByIdAndUpdate(id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Producto Eliminado",
            product
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        })
    }
}

export const updateProduct = [
    async (req, res) => {
        const { id } = req.params;
        const { name, description, price, amount } = req.body;

        let updateData = {};

        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (amount) updateData.amount = amount;

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            return res.status(200).json({
                message: "Producto actualizado correctamente",
                product: updatedProduct
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error al actualizar el producto",
                error: err.message
            });
        }
    },
];