import mongoose from "mongoose";

let applicationSchema= new mongoose.Schema(
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
            default: "Wishlist",
            enum: ["Wishlist", "Applied", "Interviewing", "Offer", "Rejected"]
        },
        jobDescription: {
            type: String,
            maxLength: 5000 
        },
        requiredSkills: [{type: String}],
        // requiredSkills: {
        //     type: [String],
        //     required: true
        // },
        prepChecklist: [{
            task: {type : String, required: true},
            isComplete: {type: Boolean, default:  false}
        }],
        salaryRange: {
            type: String,
            default: "Not Specified"
        },
        appliedDate: {
            type: Date
        }
    },
    {timestamps: true}
)


applicationSchema.index({userId: 1, updatedAt: -1});

export const Application= mongoose.model("application", applicationSchema);
