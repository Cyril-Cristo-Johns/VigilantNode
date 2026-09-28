import { Application } from "../Models/Application.js";

export const getApplications =async (req, res)=>{
    let id= req.user._id;

    try{
        const applications= await Application.find({userId: id}).sort({updatedAt: -1});

        return res.status(200).json({success: true, applications})
    }
    catch(err){
        console.log("Error fetching applications", err.message);
        res.status(500).json({success: false, error: err.message})

    }
}

export const createApplication= async (req, res)=>{
    let {company, role, status, jobDescription, salaryRange, requiredSkills, prepChecklist}= req.body;


    try{

        if(!company && !role)
            return res.status(400).json({error: "Company and role are required!!"});
    
        let rsps= await Application.create({
            userId: req.user._id,
            company,
            role,
            status: status || "Wishlist",
            jobDescription,
            salaryRange,
            prepChecklist,
            requiredSkills
        });
    
        res.status(201).json(
            {
                success: true,
                rsps
            }
        )
    }
    catch(err){
        res.status(500).json(
            {
                success : false,
                error: err.message
            }
        )
    }

}

export const deleteApplication= async (req, res)=>{
    let {id}= req.params;
    console.log(req.user);

    try{

        let deleted= await Application.findOneAndDelete(
            {
                _id: id,
                userId: req.user._id
            }
        )
    
        if(!deleted)
            return res.status(404).json(
        {
            success: false,
            error: "User not found or not authenticated"
        })
    
        res.status(200).json(
            {
                success: true,
                deleted
            }
        )
    }
    catch(err){
        console.log("500 error")
        console.log(err.message)
        res.status(500).json(
            {
                success: false,
                error: err.message
            }
        )
    }

}

export const changeStatus= async (req, res)=>{
    let {id}= req.params;
    let {status} = req.body;

    let arr=["Wishlist", "Applied", "Interviewing", "Offer", "Rejected"];
    if(!arr.includes(status))
        return res.status(400).json(
    {
        success: false,
        error: "Invalid status!"
    })

    try{

        let updated= await Application.findOneAndUpdate(
            {
                _id: id,
                userId: req.user._id
            },
            {
                status: status
            },
            {
                new : true,
                runValidators: true
            }
        )

        if(!updated)
            return res.status(404).json(
        {
            success: false,
            error: "Application not found or Unauthorized access"
        })


        res.status(200).json(
            {
                success: true,
                updated
            }
        )
    }
    catch(err){
        res.status(500).json(
            {
                success: false,
                error: err.message
            }
        )
    }
}

export const updatedApplication=async (req, res)=>{
    try{
        const updatedApp= await Application.findOneAndUpdate({_id: req.params.id, userId: req.user._id},
            req.body,
            {
                new: true
            }
        )
        console.log(req.user);

        res.status(200).json(
            {
                success: true,
                updatedApp
            }
        )
    }
    catch(err){
        console.log(err.message);
        res.status(500).json(
            {
                success: false,
                error: "Server Error: Could'nt update the applications"
            }
        )
    }
}