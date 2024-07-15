import { Schema, model, Document } from 'mongoose';

interface typeUser extends Document {
  username: string;
  password: string;
  email: string;
  roles: number;
}

const userStructure = new Schema<typeUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: Number, required: true, default: 1 }
});

export default model<typeUser>('User', userStructure);
