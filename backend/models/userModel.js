import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    username : {
        type: String,
        requited: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minLength : 5,
        required: true,
       
    },
    profilePic:{
        type: String,
        default: "",
    },
    followers:{
        type:[String],
        default: [],
    },
    following:{
        type: [String],
        defaule: [],
    },
    boi: {
        type: String,
        default: "",    
    }

 },
{
    timestamps: true,
})
 const User = mongoose.model("Users",userSchema);
export default User;