import mongoose from 'mongoose';

const plagiarismReportSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true
    },
    similarityMatrix: {
      type: Object // Can store JSON result from ML
    },
    flaggedFiles: [
      {
        fileName: String,
        similarity: Number
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('PlagiarismReport', plagiarismReportSchema);
