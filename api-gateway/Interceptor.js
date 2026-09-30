import { performance } from "node:perf_hooks";
import Analyse from "./Model/analyse.model.js";
const intercept= async (req, res, next)=>{
    let clockIn= performance.now();
    await next();

    res.on('finish', async ()=>{
        const duration= performance.now()-clockIn;
        console.log(`${req.method} ${req.url} took ${duration.toFixed(3)}`)
        try{
            const response= await Analyse.create({ip: req.ip, method: req.method, url: res.url, duration: duration.toFixed(3), status: res.statusCode});
            if(!response)
                res.status(400).json({error: "Analysis was not created"});

        }
        catch(err){
            console.log(err.message);
        }
    })

}

export default intercept;