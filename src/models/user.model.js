import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
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
    college_name: { //will fetch all the college info by this
        type: String,
        required: true
    },
    student_id: {
        type: mongoose.Types.ObjectId(),
        ref: "Student"
    },
    college_id: {
        type: mongoose.Types.ObjectId(),
        ref: "College"
    },
    faculty_id: {
        type: mongoose.Types.ObjectId(),
        ref: "Faculty"
    }
    //student id
    //college id
    //faculty id
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);

export default mongoose.model('User', userSchema);
