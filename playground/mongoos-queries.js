const {mongoose}=require('./../server/db/mongoose');
const {todo}=require('./../server/model/todo');
const {ObjectID}=require('mongodb');
const {User} =require('./../server/model/user');
let id="5cb0c38bce8338556060aa85";
let id1="ac8a3bf80e155e7b88ac0cf7";

User.findById(id1).then((todo)=>{
    if(!todo){
        return console.log('User not found');
    }
    console.log(todo);
}).catch((e)=>console.log(e));
// if(!ObjectID.isValid(id)){
//     console.log('id not valid')
// };

// todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos)
// });
// console.log("funtion is working");
// todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log(todo);
// })

// todo.findById(id).then((todo)=>{if(!todo){return console.log("id not found")}
//     console.log(todo)}).catch((e)=>console.log(e));