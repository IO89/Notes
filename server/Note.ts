import {Schema,model} from "mongoose";

export const Note = model("Note",new Schema({
    _id:String,
    data:Object
}));