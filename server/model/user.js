const bcrypt=require("bcryptjs");
const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
let UserSchema= new mongoose.Schema({
    email:{
        type:String,
        minlength:1,
        trim:true,
        unique:true,
        required:true,
        validate:{
            validator: (value)=>{
                    return validator.isEmail(value);
            }, 
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },token:{
            type:String,
            required:true
        }
    }]
});
UserSchema.methods.toJSON=function(){
    let user=this;
    let userObject=user.toObject();
    return _.pick(userObject,['id','email']);
}

UserSchema.methods.generateAuthToken=function(){
    let user=this;
    let access='auth';
    let token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
    //console.log('token');
    user.tokens=user.tokens.concat([{access,token}]);
    return user.save().then(()=>{
        return token;
    })
};
UserSchema.statics.findByToken =function(token){
    let User=this;
    let decode;
    try {
      //  console.log("inside try");
        decode=jwt.verify(token,'abc123');
        //console.log("decode success");
    }catch(e){
        //console.log('inside catch')
        return Promise.reject("authentication is required"); 
    }
    return User.findOne({
        '_id':decode._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

UserSchema.methods.removeToken=function(token){
    let user=this;
    return user.update({
        $pull:{
            tokens:{
                token:token
            }
        }
    })
};


UserSchema.statics.findByCredentials= function(email,password){

    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return  new Promise((resolve,reject)=>{
                bcrypt.compare(password,user.password,(err,success)=>{
                    if(success){
                        resolve(user);
                    }else{
                        reject();
                    }
                });
        });
    });
}

UserSchema.pre('save',function(next){
    let user=this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hashvalue)=>{
                user.password=hashvalue;
                next();
            });
        })
    }else{
        next();
    }    
});
let User=mongoose.model("User",UserSchema);


module.exports={User};