const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    dateCreated: {
        type: Date,
        default: Date.now
    }
})
module.exports=mongoose.model('user',userSchema);