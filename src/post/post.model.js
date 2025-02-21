import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    categorys: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category",
        default: "67ad0a98a2a5eeaa2dd27999"
    },
    users: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["AVAILABLE", "UNAVAILABLE"],
        default: "AVAILABLE"
    }
}, 
{
    timestamps: true,
    versionKey: false
});

export default model('Post', postSchema);