import { Schema, model } from "mongoose";
// ! Define the schema
const pollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answere: {
        type: [String],
        required: true,
        minlength: 1,
        maxlength: 3
    }
});
// ! Export the schema 
const pollModel = model("Poll", pollSchema);
export default pollModel;
