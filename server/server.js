//local exports
require('./../config');
const mongoose=require('./db/mongoose');
const {todo}=require('./model/todo');
const {User}=require('./model/user');;
const bcrypt=require('bcryptjs');
const port=process.env.PORT || 3000;
const _=require("lodash");
let {authenticate}=require('./middleware/authenticate')


//library imports
const express=require('express');
const bodyparser= require('body-parser');
const {ObjectID}=require('mongodb');
const app=express();
app.use(bodyparser.json());

//1st todo route to create todo
app.post('/todos',authenticate,(req,res)=>{
    let todos=new todo({
        text:req.body.text,
        _creator:req.user._id
    });
    todos.save().then((docs)=>{
        res.send(docs);
    },(e)=>{
        res.status(400).send(e);
    })
});

//2nd todo route to get todos
app.get('/gettodos',authenticate,(req,res)=>{
   // console.log(req.user._id);
    todo.find({_creator:req.user._id}).then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

//3rd todo route to get todo by id
app.get('/getonetodo/:id', authenticate,(req,res)=>{
    //res.send(req.params);
    let id= req.params.id;
        if(!ObjectID.isValid(id)){
            return res.status(400).send("your id is invalid");
        }
     todo.findOne({
         _id:id,
         _creator:req.user._id
     }).then((todos)=>{
        if(!todos){
           res.status(404).send("there is no todos");
        }else{ 
        res.send({todos});}
     },(e)=>{
         res.status(400).send(e);
     });
}); 

//4th todo route to delete todo
app.delete('/delete/:id',authenticate,(req,res)=>{
    let id =req.params.id;
    //console.log("inside delete request");
    if(!ObjectID.isValid(id)){
      //  console.log("inside delete1 request");
        return res.status(404).send("id is invalid");
    }
    todo.findOneAndRemove({_creator:req.user,_id:id}).then((todo)=>{
        if(!todo){
        //    console.log("inside delete2 request");
            return res.status(404).send("requested id is not found");
        }
        //console.log("inside delete3 request");
        res.send({todo});
    },(e)=>{
        //console.log("inside delete4 request");
        res.status(400).send(e);
    });
});

app.patch("/update/:id",authenticate,(req,res)=>{
    let id =req.params.id;
    let body=_.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send("your id is invalid");
    }

    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt=new Date().getTime();
    }else{
        body.completed=false;
        body.completedAt=null;
    } 
    todo.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send("no id is found");
        }
        res.send({todo});
    }).catch((e)=>{res.status(400).send(e);
        });

});


//POST /users
app.post('/signup',(req,res)=>{
    let body=_.pick(req.body,['email','password']);
   // console.log(body);
    let user=new User(body);
    //console.log('inside post mehtod')
    user.save().then((user)=>{
      //  console.log('inside save mehtod')
        return user.generateAuthToken();
    }).then((token)=>{ 
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });

});

app.get('/user/me',authenticate,(req,res)=>{

res.send(req.user);
});

//POST user login route
app.post("/user/login",(req,res)=>{
    let body=_.pick(req.body,["email","password"])
    User.findByCredentials(body.email,body.password).then((user)=>{
        //console.log("user in user/login route   :"+user);
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);   
        })
    }).catch((e)=>{res.status(400).send("No user found")});
})
app.listen(port,()=>{
    console.log(`Satrted on port ${port}`);
});

//delete route

app.delete("/user/me/token",authenticate,(req,res)=>{
req.user.removeToken(req.token).then(()=>{
    res.status(200).send();
},()=>{
    res.status(400).send("unable to logout from the route");
})
});

module.exports={app};

// let firstuser=new User({
//     email:'dawood.multhanwala@gmail.com'
// });
// firstuser.save().then((docs)=>{
//     console.log("user saved successfully",docs)
// },(e)=>{
//     console.log("not able to save ",e)
// });
// // let task=new todo({});

// // task.save().then((doc)=>{
// //     console.log(doc);
// // });

