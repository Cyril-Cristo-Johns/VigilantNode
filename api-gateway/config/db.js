import mongoose from "mongoose";

const connect= async ()=>{
    let uri= process.env.MONGO_URI;

    if(!uri)
        throw new Error("No URI detected")

    const connected= await mongoose.connect(uri)
    console.log("Database Connected")
    if(!connected)
        process.exit(1);

    return connected;
}
export default connect;