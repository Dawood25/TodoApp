const {MongoClient,ObjectID}= require('mongodb');
MongoClient.connect('mongodb://localhost:27017/demottodoapp',(err,client)=>{
    if(err){
        return console.log('unable to connect to mongodb server');
    }
    console.log('connected to mongodb server');
    const db=client.db('demotodoapp');
    db.collection('User').find({name:'dawood'}).toArray().then((docs)=>{
        console.log("Users");
        console.log(JSON.stringify(docs,undefined,2))
    },(err)=>{
        console.log('unable to fetch users',err);
    })
});
// MongoClient.connect('mongodb://localhost:27017/demotodoapp',(err,client)=>{
//     if(err){
//         return console.log('unable to connect to mongodb server');
//     }
//     console.log("connected to mongodb server");
//     const db=client.db('demotodoapp');
//     db.collection('User').find({
//         _id:new ObjectID('5c7cf16bae952e62cc212994')
//     }).toArray().then((docs)=>{
//         console.log('Users');
//         console.log(JSON.stringify(docs,undefined,2));
//     },(err)=>{
//     console.log("unable to fetch todos",err)    
//     });
    //db.close();
//});