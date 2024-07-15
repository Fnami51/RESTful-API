import { Schema, model, Document } from 'mongoose';

interface typeBook extends Document {
  title: string;
  author: string;
  publicationDate: Date;
  genres: string[];
}

const bookStructure = new Schema<typeBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  genres: { type: [String], required: true }
});

export default model<typeBook>('Book', bookStructure);
