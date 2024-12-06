import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    password: string;
    role: "user" | "admin";
    comparePassword(password: string): Promise<boolean>;
    createdAt: Date;  
    uploadedAt: Date; 
  }
  
  const userSchema = new Schema<IUser>(
    {
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, required: true, enum: ["user", "admin"] },
      createdAt: { type: Date, default: null } 
    },
    {
      timestamps: true, 
    }
  );

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

export const User = model<IUser>('User', userSchema);

export default User;

