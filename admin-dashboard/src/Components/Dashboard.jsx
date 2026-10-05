import { useEffect, useState } from "react";

const Dashboard =()=>{

    const [list, setList]= useState([]);

    useEffect(()=>{

        async function getAnalysis(){
            let res=  await fetch("http://localhost:4000/api/analyse");
            try{

                if(!res.ok)
                    console.log("Fetch unsuccessful!!");
    
                let data= await res.json();
                setList(data.response);
            }
            catch(err){
                console.log(err.message)
            }
        } 
        getAnalysis();
    }, [])
    // if(list)
    //     console.log(list)

    
    return (
        <>
        <div className="text-black text-xl">
            {
                list?list.map((val, index)=>{
                    return (
                        <div key={index}>
                            {val.createAt}
                            {val.ip}
                            {val.method}
                            {val.updatedAt}
                            {val.url}
                            </div>
                    )
                }
                ):"...Loading"
            }
        </div>
        </>
    )
}

export default Dashboard;