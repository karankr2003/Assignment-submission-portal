import mongoose, { Document, Schema } from 'mongoose';

interface IAssignment extends Document {
  userId: mongoose.Types.ObjectId;
  task: string;
  admin: mongoose.Types.ObjectId;
  status: string;
  filePath: string;
  createdAt: Date;  
  updatedAt: Date;  
}

const assignmentSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    task: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    status: {
       type: String, required: true },
    filePath: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model<IAssignment>('Assignment', assignmentSchema);

export default Assignment;
