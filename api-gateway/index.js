import express from "express";
import connect from "./config/db.js";
import "dotenv/config"
import cors from "cors"
import intercept from "./Interceptor.js";
import ReRouting from "./Route/Rerouting.routes.js";

let app= express();
app.use(express.json())
app.use(cors({
    origin: true
}))
let link= process.env.LINK;

app.use(intercept)
app.use(ReRouting)
connect()
.then(
    app.listen(4000, ()=>{
    console.log("Server Starts!")
})
)
.catch((err)=>{
    console.log(err.message)
})
