import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'College name is required'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'College code is required'],
      unique: true,
      uppercase: true
    },
    address: [
      {
        city: {
          type: String,
          required: true
        },
        state : {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        pincode: {
          type: Number,
          required: true
        }
      }
    ],
    contactEmail: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email']
    },
    contactNumber: {
      type: String
    },
    website: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('College', collegeSchema);
