const {todo}=require('./../model/todo');
const {ObjectID}=require('mongodb');
const {User}=require("./../model/user");
const jwt=require('jsonwebtoken');

const useroneid=new ObjectID();
const usertwoid=new ObjectID();
const users =[{
    _id:useroneid,
    email:"userone@example.com",
    password:'useronepass',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:useroneid,access:'auth'},'abc123').toString()
    }]
},{
    _id:usertwoid,
    email:"usertwo@example.com",
    password:'usertwopass',
    tokens:[{
        access:'auth',
        token:jwt.sign({_id:usertwoid,access:'auth'},'abc123').toString()
    }]
}]


const todoss=[{
    _id:new ObjectID(),
    _creator:useroneid,
    text:'First test todo'
},{_id:new ObjectID(),
    _creator:usertwoid,
    text:'second test todo'}]

const populateUsers=function(done){
    this.timeout(50000);
    User.remove({}).then(()=>{
        var userone=new User(users[0]).save();
        var usertwo=new User(users[1]).save();

        return Promise.all([userone,usertwo])
    }).then(()=>done()); 
}

 const populateTodos=function (done){
    this.timeout(5000);      
    todo.remove({}).then(()=>{
            return todo.insertMany(todoss);
    }).then(()=>done());
 };

 module.exports={todoss,populateTodos,users,populateUsers};