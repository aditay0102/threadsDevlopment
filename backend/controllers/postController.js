
import User from '../models/userModel.js'

import Post from '../models/postModel.js'
import generateTokenAndSetCookie from '../utils/helpers/generateTokkenAndSetCookies.js'
import bcrypt from 'bcrypt'

const createpost = async (req,res)=>{
    try{
        const id = req.user._id;
        const newPost = new Post({
            postedBy: id,
            text: req.body.text,  
            img: req.body.img,
        })

        await newPost.save();
        res.json(newPost);
    }
    catch(error){
        console.log({message: error.message});
    }

}
const getpost = async(req,res)=>{
    try{
        const {id} = req.params;
       
        let result = await Post.findById(id);
        if(!result){
            res.status(404).json({message: "post not found"})
        }
        res.json(result);
    
    }
    catch(error){
        res.status(402).json({message: error.message});
        console.log({message: error.message});
    }

}

const postUpdate = async(req,res)=>{
    try{
        let curr = await User.findById(req.user._id);
        let result = await Post.find(curr._id);
        res.json(result);
        
    }
    catch(error){
        res.status(402).json({message: error.message});
        console.log({message: error.message});
    }
}


const delpost = async(req,res)=>{
    try{
        const {id} = req.params;
        const userid = req.user.id;
        const post = await Post.findById(id);

        if(!post) res.status(402).json("post not found ");

        if(post.postedBy != userid ){
          return  res.status(402).json({message: "post not found"})
        }

        await Post.findByIdAndDelete(id);
        res.status(500).json({message: "deleted Successfully"})
    
    }
    catch(error){
        res.status(402).json({message: error.message});
        console.log({message: error.message});
    }

}

const likeUnlike = async(req,res)=>{
    try{
        const {id:postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post){
            res.status(404).json({message: "Post not found"});
        }

        const userLikedPost = post.likes.includes(userId);
        if(userLikedPost){
            // unlike post
            await Post.updateOne({_id:postId},{$pull: {likes:userId} });
            res.status(200).Json({message: "Post Unliked "});
        }
        else{
            // liked post
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message: "Post liked"});

        }

    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log({message: error.message});
    }
}

const replyToPost = async(req,res)=>{
    try{
        const postId = req.params.id;
        const userId = req.user._id;
        const username = req.user.username;
        const userProfilePic = req.body.userProfilePic;
        const text  = req.body.text;
        
        if(!text){
            return res.status(402).json("text not found");
        }
        
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json("post not found");

        const reply = {userId,username,userProfilePic,text};

        post.replies.push(reply);
        await post.save();

        res.status(200).json(userProfilePic);
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log({message: error.message});
    }
}




export {createpost,getpost,postUpdate,delpost,likeUnlike,replyToPost};