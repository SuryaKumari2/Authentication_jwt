const User=require('../models/UserModel');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const secretKey=process.env.POWER_KEY
const userRegister=async(req,res)=>{

    try {
        const{userName,email,password}=req.body;
        const user=await User.findOne({email});
        if(user)
        {
            return res.status(400).json({message:'email already taken'})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            userName,email,password:hashedPassword
        })
       const savedUser= await newUser.save();
        res.status(200).json({message:'registeration successfull'});
        
    } catch (error) {
        console.log(error);
        res.status(500);
    }

}

const userLogin=async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password)))
        {
            return res.status(400).json({message:'Invalid credentials'})
        }
        
        const token=jwt.sign({userId:user._id},secretKey,{expiresIn:'3h'})
        res.status(200).json({message:'Login successfull',token,role:user.role});
        
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}



const userProfile=async(req,res)=>{
    try{

        let exist =await User.findById(req.user.id)
        if(!exist)
            {
                return res.status(400).send('user not found');
            }
            res.json(exist);
    }
    catch(error){
        console.log(error);
        return res.status(500).send('server issues');
    }
}

module.exports={userRegister,userLogin,userProfile}