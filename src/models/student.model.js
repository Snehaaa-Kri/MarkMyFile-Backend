import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },
    batch: {
      type: String
    },
    branch: {
      type: String
    },
    labs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lab'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Student', studentSchema);
