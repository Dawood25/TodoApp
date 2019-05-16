const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        return console.log("unable to connect to the mongodb",err);
    }
    console.log("connected with mongodb successfullly");
    const db=client.db('demotodoapp');
    db.collection('Todos').findOneAndUpdate({text:'walked the dog'},{$set:{completed:false}}).then((result)=>{
        console.log(result);
    });
    client.close();
});