import Comment from "../comment/comment.model.js";
import jwt from "jsonwebtoken";

export const createComment = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No estás autenticado" });

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userId = decoded.uid;

        const { text, post } = req.body;

        const newComment = new Comment({
            text,
            user: userId,
            post
        });

        await newComment.save();

        res.status(201).json({ success: true, message: "Comentario agregado", comment: newComment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al agregar comentario", error: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No estás autenticado" });

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userId = decoded.uid;

        const { id } = req.params;
        const { text } = req.body;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: "No tienes permiso para editar este comentario" });
        }

        comment.text = text;
        await comment.save();

        res.status(200).json({ success: true, message: "Comentario actualizado", comment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar comentario", error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No estás autenticado" });

        const decoded = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const userId = decoded.uid;

        const { id } = req.params;

        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ message: "Comentario no encontrado" });

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este comentario" });
        }

        await Comment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Comentario eliminado" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar comentario", error: error.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId }).populate("user", "username email");

        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener comentarios", error: error.message });
    }
};
