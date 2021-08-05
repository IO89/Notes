import { Schema, model } from 'mongoose';

// export const Note = model("Note", new Schema({
//   data: Object
// }));

export const Note = model(
  'Note',
  new Schema({
    id: String,
    text: String,
    date: String,
    order: Number
  })
);
