const{MongoClient, Object}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    const db =client.db('TodoApp');
    db.collection('todo').insertOne({name:'becky',age:20,location:'pennyselvania'}).then((result)=>{
        console.log(result);
    });
    db.collection('User').insertOne({name:'becky',age:25,location:'paris'}).then((result)=>{
        console.log(result);
    });
    db.collection('User').insertOne({name:'becky',age:23,location:'philadelphia'}).then((result)=>{
        console.log(result);
    });
    db.collection('User').insertOne({name:'dawood',age:20,location:'india'}).then((result)=>{
        console.log(result);
    });
    db.collection('User').insertOne({name:'bretty',age:30,location:'new jersey'}).then((result)=>{
        console.log(result);
    });
    client.close();
})