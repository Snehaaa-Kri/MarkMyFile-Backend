import mongoose from 'mongoose';

const labSchema = new mongoose.Schema(
  {
    labName: {
      type: String,
      required: true
    },
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      }
    ],
    joinCode: {
      type: String,
      unique: true
    }
    
  },
  {
    timestamps: true
  }
);

// Generate random join code before saving
labSchema.pre('save', function (next) {
  if (!this.joinCode) {
    this.joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();  // Example: "A1B2C3"
  }
  next();
});

export default mongoose.model('Lab', labSchema);
