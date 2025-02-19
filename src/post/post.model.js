import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    categorys: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: "67ad0a98a2a5eeaa2dd27999"
    },
    text: {
        type: String,
        required: true
    },
}, 
{
    timestamps: true,
    versionKey: false
});

export default model('Product', productSchema);