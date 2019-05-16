const MongoClient=require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017",(err,client)=>{
    if(err){
        return console.log("data base not connected successfully",err);
    }
    const db=client.db('demotodoapp');
    const collection=db.collection('Todos');

    collection.insertOne({text:'walk the dog',completed:false},(err, result)=>{
        if(err){
            return console.log('record is not inserted');
        }
        console.log(JSON.stringify(result));
    })
    collection.insertOne({text:'walk the dog',completed:false},(err, result)=>{
        if(err){
            return console.log('record is not inserted');
        }
        console.log(JSON.stringify(result));
    })
    collection.insertOne({text:'walk the dog',completed:false},(err, result)=>{
        if(err){
            return console.log('record is not inserted');
        }
        console.log(JSON.stringify(result));
    })
    collection.insertOne({text:'Eat lunch',completed:true},(err, result)=>{
        if(err){
            return console.log('record is not inserted');
        }
        console.log(JSON.stringify(result));
    });
    db.close();
})