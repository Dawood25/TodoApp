const bcrypt=require('bcryptjs');

let password="123abc";

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(password,salt,(err,has)=>{
//         console.log(has);
//     })
// });
let hasedpassword='$2a$10$YypBceowugnMvRGGt2yjR.dkVdw53Pmmu/HZrWS9Xhw4.RicPspLu';
bcrypt.compare(password,hasedpassword,(err,bool)=>{
    console.log(bool);
})

// const {SHA256}=require('crypto-js');
// const JWT =require('jsonwebtoken');

// let data ={
//     id:10
// }

// let token=JWT.sign(data,'123abc')
// console.log(token);

// let decode=JWT.verify(token,'123abc');
// console.log('decoded:'+decode)
// let message='I am user number 3';
// var hash=SHA256(message).toString();
// console.log(`hash ${hash} and message ${message}`);

// let data={
//     id:4
// };
// let token={
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// }
// token.data.id=5;
// token.hash=SHA256(JSON.stringify(token.data)).toString();

// let resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString();
// if(resultHash===token.hash){
//     console.log('data has not been compromised');
// }else{
//     console.log('data has been compromised');
// }