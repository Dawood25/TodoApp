const mongoose=require('mongoose');
let TodoSchema= new mongoose.Schema({
    text:{
    type:String,
    required:true,
    trim:true,
    minlength: 1
    },
    completed:{
        type:Boolean,
        default:false},
    completedAt:{type:Number,
        default:null
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
    });
    let todo=mongoose.model('todo',TodoSchema);    

    module.exports={todo};