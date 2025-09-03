import mongoose from 'mongoose';

const labSchema = new mongoose.Schema(
  {
    //subject
    //subject code
    //faculty taking the lab [Faculty schema ref]
    //students [Student]
    
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Faculty', facultySchema);
