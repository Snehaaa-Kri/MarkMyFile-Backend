import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment',
      required: true
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    filePath: {
      type: String,
      required: true
    },
    plagiarismScore: {
      type: Number,
      default: 0
    },
    grade: {
      type: Number
    },
    status: {
      type: String,
      enum: ['submitted', 'graded', 'pending', 'rejected'],
      default: 'submitted'
    },
    feedback: {
      type: String 
    },
    rejectionReason: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Submission', submissionSchema);
