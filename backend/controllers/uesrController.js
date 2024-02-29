import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import generateTokenAndSetCookie from "../utils/helpers/generateTokkenAndSetCookies.js";
import Post from "../models/postModel.js";

const signupUser = async(req,res) =>{
    try{
        const{name,email,username,password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]});    

        if(user){
            return res.status(400).json({message: "User already exists"});

        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        

        if(newUser){
            generateTokenAndSetCookie(newUser._id,res);
            res.status(201).json({
                _id: newUser._id,
                name : newUser.name,
                email: newUser.email,
                username : newUser.username,
                password : newUser.passoword,

            })
        }
        else{
            res.status(400).json({message: "Invalid user data"});
        }


    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in sinupUser",error.message);
    }


}

const loginUser = async (req,res) => {
    try{
        const{name,email,username,password} = req.body;
        const user = await User.findOne({username});    
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "" );

        if(!user || !isPasswordCorrect) return res.status(400).json({message: "Invalid username or password"});


        
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            password: user.passoword,
        })
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in loginUser:" , error.message);
    }
}

const logoutUser = async (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:1});
        res.status(200).json({message: "User logged out Successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in signupUser",error.message);
    }
}

const followUnfollowUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await   User.findById(req.user._id);

        if(id === req.user._id) return res.status(400).json({message: "you cannot follow/unfollow yourself"});
        
        if(!userToModify || !currentUser)return res.status(400).json({message: "user not found"});

        const ifFollowing = currentUser.following.includes(id);

        if(ifFollowing){    
            // for unfolow
            // MOdify current user following , modify followrs of usertoModify
            await User.findByIdAndUpdate(req.user._id,{$pull:{following: id}});
            await User.findByIdAndUpdate(id,{$pull:{followers: req.user._id}});
            res.status(200).json({message: "User unfollowed successfully"});

        }
        else{
            // follow
            await User.findByIdAndUpdate(req.user._id,{$push: {following: id}});
            await User.findByIdAndUpdate(id,{$push: {followers: req.user._id}});
            res.status(200).json({message: "User followed successfully"});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in follow/Unfollow User ",error.message);
    }
}

const updateUser = async (req,res)=>{
    
    try{
        const {id} = req.params; 
        const currentUser = await   User.findById(req.user._id);
       
        let id2 = currentUser._id;
        if(id == id2 ){
            const password  = req.body.password;
            const salt = await bcrypt.genSalt();
            const newpassword = await bcrypt.hash(password,salt);
            req.body.password = newpassword;

            const result = await User.findByIdAndUpdate(id,req.body);

           return res.json(result)
        }
        res.json({message: "not working"})
    }
    catch(error){
        res.status(400).json({message: error.message});
        console.log({message: error.message});
    }
}

const profile = async (req,res)=>{
    
    try{
      
        const currentUser = await   User.findById(req.user._id);  
        return res.json(currentUser)
     
        
    }
    catch(error){
        res.status(400).json({message: error.message});
        console.log({message: error.message});
    }
}

const thirdprofile = async(req,res)=>{
    try{
        const {id} = req.params; 
        const showUser = await   User.findById(id);
       
       

        res.json(showUser)


    }
    catch(error){
        res.status(400).json({message: error.message});
        console.log({message: error.message});
    }
}



export  {signupUser,loginUser,logoutUser,followUnfollowUser,updateUser,profile,thirdprofile};