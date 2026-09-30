
const ReRouting=async (req, res)=>{
    let { endpoint }= req.body;
    let method= req.method;
    try{
        let response=await fetch(`http://localhost:3000/api/${endpoint}`, 
            {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    authorization: req.headers.authorization
                },
                body: JSON.stringify(req.body)
            }
        )

        let data=await response.json();
        res.url= response.url;
        res.status(response.status).json(data);

    }
    catch(err){
        console.log(err.message);
        console.log("Error is in Re-routing fetch")
        res.status(500).json({error: err.message})
    }
}

export default ReRouting;