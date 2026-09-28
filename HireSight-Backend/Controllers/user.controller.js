import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Application } from "../Models/Application.js";


const generateToken= (id)=>jwt.sign(
    {id},
    process.env.SECRET,
    {
        algorithm: "HS256",
        expiresIn: "30d"
    }
);

const hashing= async (password)=>{
    let salt=await bcrypt.genSalt(10);
    let hashedPassword=await bcrypt.hash(password, salt);

    return hashedPassword;
}

const verification= async (password)=>{
    // return jwt.verify(password, )
}

export const userRegister= async (req, res)=>{
    let {name, email, password}= req.body;

    try{

        let userExists= await User.findOne({email});
        if(userExists)
            return res.status(401).json(
        {
            success: false,
            error: "USER already exists"
        })

        let hashedPassword= await hashing(password);
        let user= new User({name, password: hashedPassword, email});
        let status= await user.save();
        if(!status)
            return res.status(400).json(
        {
            success: false,
            error: "Invalid User Data"
        })
        let id= status._id;
        let token= generateToken(id);


        res.status(201).json(
            {
                success: true,
                user: {
                    name,
                    email,
                    token
                }
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

export const userLogin= async (req, res)=>{
    let {email, password}= req.body;

    try{

        let user=await User.findOne({email});
        if(!user)
            return res.status(404).json(
        {
            success: false,
            error: "User not found"
        })

        let isMatch= await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.status(401).json(
        {
            success: false,
            error: "Wrong Password!!"
        })

        res.status(200).json(
            {
                success: true,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    token: generateToken(user._id)
                }
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

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await Application.deleteMany({ userId: req.user._id });
    
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({ message: 'Account and all data deleted' });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Failed to delete account' });
  }
};