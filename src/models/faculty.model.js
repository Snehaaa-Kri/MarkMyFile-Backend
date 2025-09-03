import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Faculty', facultySchema);
