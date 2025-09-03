import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    // name = username
    // roll num 
    // branch code
    // subject
    // faculty
    
    
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Student', studentSchema);
