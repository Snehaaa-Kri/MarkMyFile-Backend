import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    },
    role: {
      type: String,
      enum: ['student', 'faculty'],
      default: 'student'
    },
    collegeName: { //will fetch all the college info by this
        type: String,
        required: true
    },
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: "Student"
    },
    facultyId: {
      type: mongoose.Types.ObjectId,
      ref: "Faculty"
    },
    collegeId: {
      type: mongoose.Types.ObjectId,
      ref: "College"
    }
  },
  {
    timestamps: true 
  }
);

export default mongoose.model('User', userSchema);
