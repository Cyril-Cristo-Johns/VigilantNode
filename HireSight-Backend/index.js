import express from "express";
import user_route from "./Routes/user.routes.js";
import "dotenv/config";
import connected from "./Config/Db.js";
import cors from "cors";
import applicationRouter from "./Routes/application.routes.js";
import ai_Router from "./Routes/ai.routes.js";


let app= express();

app.use(cors(
    {
        origin: "*"
    }
))
app.use(express.json());
app.use("/api/users", user_route);
app.use("/api/applications", applicationRouter);
app.use("/api/ai", ai_Router);

const PORT= process.env.PORT || 3000;

connected().then(()=>{

    app.listen(PORT, ()=>{
        console.log("Server Started!!");
    })
}
)
.catch((err)=> console.log("Database Connection Failed", err));