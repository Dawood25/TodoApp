let {User}=require('./../model/user');

let authenticate = (req,res,next)=>{
    let token=req.header('x-auth');
    //console.log(token);
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
     //   console.log("in authenticate route and user is : "+ user);
        req.user=user;
        req.token=token;
        next();
        
    }).catch((e)=>{res.status(401).send(e)});
    
}

module.exports={authenticate};
