const {MongoClient,ObjectId}=require('mongodb');

// MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
//     if(err){
//         return console.log('unable to connect with mongodb',err);
//     }
//     console.log('connnected successfully with mongo db server');
//     const db=client.db('demotodoapp');
//     db.collection('Todos').find({text:'Eat Lunch'}).toArray().then((docs)=>{
//         console.log('Todos');
//         console.log(JSON.stringify(docs,undefined,2));
//     },(err)=>{
//         console.log('there is some error in getting promise back',err);
//     });
//     client.close();
// });

// MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
//     if(err){
//         return console.log('unable to connect to the mongodb'); 
//     }
//     console.log("successfully connected to the mongodb server")
//     const db=client.db('demotodoapp');
//     //delte many
//     // db .collection('Todos').deleteMany({text:'walk the dog'}).then((success)=>{
//     //     console.log(success);
//     // });

//     //deleteone
//     db.collection('Todos').deleteOne({text:'walk the dog'}).then((result)=>{
//         console.log(result);
//     });
//     //find one and delete


//     db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
//         console.log(result);
//     })
//     client.close();
// });

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
if(err){
    return console.log('unable to connect to the database');
}
console.log('mongo db connected successfully');
const db=client.db('demotodoapp');
db.collection('Users').deleteMany({name:'betty'}).then((result)=>{
    console.log(result);
});

db.collection('Users').findOneAndDelete({_id:ObjectId("5c8676137a2207231481fc36")});
client.close();
})