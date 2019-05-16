let mongoose=require('mongoose');
//let {todo}=require('./../server/model/todo');
mongoose.connect('mongodb://localhost:27017/TodoApp');

let DemoSchema=new mongoose.Schema({
    text:{
        name:String,
        age:Number,
        location:String
    }
},{collection:'User'});
let todo=mongoose.model('todo',DemoSchema);
todo.find().then((todo)=>{console.log(todo)});