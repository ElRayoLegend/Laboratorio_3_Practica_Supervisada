import { Schema, model} from "mongoose";

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Category", CategorySchema);
