import { GoogleGenerativeAI } from "@google/generative-ai";
let genai= new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY.trim());

export const sendJobDescription= async (req, res)=>{

    let { jobDescription }= req.body;
    if(!jobDescription)
        return res.status(400).json({
    success: false,
    error: "Job Descriptions is required"
    });


    try{

    
        let model= genai.getGenerativeModel({
            model: "gemini-3.5-flash",
            generationConfig: { responseMimeType: "application/json"}
        });
   
        let prompt= `
        You are an expert technical recruiter and career coach. 
          Analyze the following job description and extract two things:
          1. A list of 5-7 core technical skills required.
          2. A highly actionable, step-by-step interview preparation checklist (4-6 items).
    
          Return the result STRICTLY using this exact JSON schema:
          {
            "requiredSkills": ["skill 1", "skill 2"],
            "prepChecklist": [
              { "task": "Actionable prep step 1", "isCompleted": false },
              { "task": "Actionable prep step 2", "isCompleted": false }
            ]
          }
    
          Job Description:
          ${jobDescription}`
    
          let result = await model.generateContent(prompt);
          let data= result.response.text();
          let parsedData= JSON.parse(data);

          res.status(200).json({
            success: true,
            data: parsedData
          })
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            success: false,
            error: "Failed to analyse Job Description" 
        })
    }
    
}