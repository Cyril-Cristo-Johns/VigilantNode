import jwt from "jsonwebtoken";

export const protect= (req, res, next)=>{

    let token= req.headers.authorization?.split(" ")[1];

    if(!token)
        return res.status(401).json(
    {
        success: false,
        error: "Authentication Error: Token not received"
    })

    try{
        let decoded= jwt.verify(token, process.env.SECRET);
        req.user={_id: decoded.id};
        next();
    }
    catch(err){
        
        return res.status(400).json(
    {
        success: false,
        error: "Authentication error: Token not Authenticated"
    })
    }

}