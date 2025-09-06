import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    // this will contain the resources uploaded by the teacher for student in a lab
    // Resource details
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    filePath: {
      type: String,
      required: true
    },

    // Linked lab
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lab',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Resource', resourceSchema);
