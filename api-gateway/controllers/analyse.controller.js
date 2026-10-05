import Analyse from "../Model/analyse.model.js";

const getAnalysis= async (req , res)=>{
    let ip= req.ip;
    if(!ip){
        console.log("ip Field is Empty");
        res.status(400).json({error: "IP address is not visible"})
        return;

    }

    try{
        let response= await Analyse.find(
            {
                ip: ip
            }
        )
        if(!response)
            console.log("Could'nt get the reports");

        res.status(200).json(
            {
                success: true,
                response
            }
        )
    }
    catch(err){
        console.log("Could'nt get the Analysis: ", err.message);
        res.status(500).json({
            success: false,
            error: "Internal Server Error!"
        })
    }
}


export {
    getAnalysis
}