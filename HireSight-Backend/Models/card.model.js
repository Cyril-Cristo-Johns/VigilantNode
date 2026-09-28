import mongoose from "mongoose";

let cardSchema = new mongoose.Schema(
    {
        userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      index: true 
    },
    company: { 
      type: String, 
      required: true,
      trim: true 
    },
    role: { 
      type: String, 
      required: true 
    },
    status: {
      type: String,
      enum: ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected'],
      default: 'Wishlist'
    },
    jobDescription: { 
      type: String,
      maxLength: 5000 
    },
    requiredSkills: [{ 
      type: String 
    }],
    prepChecklist: [
      {
        task: { type: String, required: true },
        isCompleted: { type: Boolean, default: false }
      }
    ],
    salaryRange: { 
      type: String, 
      default: 'Not specified' 
    },
    appliedDate: { 
      type: Date 
    }
  },
  { timestamps: true }
);

cardSchema.index({userId: 1, updatedAt: -1});

const Card= mongoose.model("card", cardSchema);

export default Card;