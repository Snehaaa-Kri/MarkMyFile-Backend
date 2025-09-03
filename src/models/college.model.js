import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
    }
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);

export default mongoose.model('College', collegeSchema);
