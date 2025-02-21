import Category from "./category.model.js";
import Post from "../post/post.model.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const newCategory = new Category({ name });
        await newCategory.save();

        return res.status(201).json({ message: "Categoria creada exitosamente", newCategory });
    } catch (err) {
        return res.status(500).json({ message: "Error al crear la categoria", error: err.message });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name } = req.body;

        const category = await Category.findByIdAndUpdate(categoryId, { name }, { new: true });

        if (!category) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }

        return res.status(200).json({ message: "Categoria actualizada", category });
    } catch (err) {
        return res.status(500).json({ message: "Error al actualizar categoria", error: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Categoria no encontrada" });
        }

        await Post.updateMany(
            { categorys: categoryId },
            { $pull: { categorys: categoryId } }
        );

        await Category.findByIdAndDelete(categoryId);

        return res.status(200).json({ message: "Categoria eliminada y publicaciones desasignadas" });
    } catch (err) {
        return res.status(500).json({ message: "Error al eliminar categoria", error: err.message });
    }
};

export const getAllCategorys = async (req, res) => {
    try {
        const categorys = await Category.find().populate("posts", "name");

        return res.status(200).json({
            message: "Categorias disponibles",
            categorys
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error al obtener categorias",
            error: err.message
        });
    }
};

const createDefaultCategory = async () => {
    const categoryExists = await Category.findOne({ name: "Sin Categoría" });

    if (!categoryExists) {
        const newCategory = await Category.create({ name: "Sin Categoría" });
        console.log("Categoria por defeto creada con el ID:", newCategory._id);
    } else {
        console.log("La categoria por defecto ya existe");
    }
};

createDefaultCategory();