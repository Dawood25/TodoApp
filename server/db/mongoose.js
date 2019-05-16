require('./../../config');
console.log(process.env.MONGODB_URI);
const mongoose= require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGODB_URI);
console.log('inside mongoose file');
//mongoose.connect('mongodb://dawood25:dawood.25@ds145346.mlab.com:45346/todoapp')


module.exports={mongoose};