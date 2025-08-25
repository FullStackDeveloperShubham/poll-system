import { Document, Schema, model } from "mongoose";

// ! Define the interface 
interface IPoll extends Document {
    question: string;
    answere: string[];
}

// ! Define the schema
const pollSchema = new Schema<IPoll>({
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
})

// ! Export the schema 
const pollModel = model<IPoll>("Poll", pollSchema)
export default pollModel

