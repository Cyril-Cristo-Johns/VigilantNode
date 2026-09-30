import mongoose from "mongoose";

let analyseSchema= new mongoose.Schema(
    {
        ip: {
            type: String,
            required:true
        },
        url: {
            type: String,
            required:true
        },
        duration: {
            type: Number,
            required:true
        },
        method: {
            type: String,
            required:true
        },
        status: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

let Analyse= mongoose.model("analysis", analyseSchema);

export default Analyse;