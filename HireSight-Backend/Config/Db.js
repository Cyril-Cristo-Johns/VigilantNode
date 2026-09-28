import mongoose from "mongoose";

let connected= async ()=>{

    let uri= process.env.MONGO_URI;
    if(!uri){
        console.log("Fatal Error! Database URI key not found");
        process.exit(1);
    }
        let conn= await mongoose.connect(uri);

        console.log(conn.connection.host);
        console.log("Database Connected")
}

export default connected;