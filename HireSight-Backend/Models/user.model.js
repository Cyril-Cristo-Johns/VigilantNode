import mongoose from "mongoose";

let userShema= new mongoose.Schema(
    {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      index: true 
    },
    password: { 
      type: String, 
      required: true 
    }
  },
  { timestamps: true }
)

let User= mongoose.model("user", userShema);

export default User;