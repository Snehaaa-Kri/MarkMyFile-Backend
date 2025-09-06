import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lab',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    deadline: {
      type: Date,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true
    },
    resources: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Assignment', assignmentSchema);
