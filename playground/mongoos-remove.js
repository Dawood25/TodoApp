const {mongoose}=require('../server/db/mongoose');
const {todo}=require('../server/model/todo');
const {ObjectID}=require('mongodb');
const {User} =require('../server/model/user');
let id="5cb0c38bce8338556060aa85";
let id1="ac8a3bf80e155e7b88ac0cf7";

// todo.remove({}).then((result)=>{
//     console.log(result);
// });

//todo.findOneAndRemove
//todo.findByIdAndRemove

// todo.findByIdAndRemove('5cbc5479812687b00ffd6f62').then((todo)=>{
// console.log(todo);     
// })
todo.findOneAndRemove({_id:"5cbc5479812687b00ffd6f62"}).then(todo=>{
    console.log(todo);
})