let env=process.env.NODE_ENV || 'development';
console.log("inside config file and value is :"+env);
if(env==='test'){
    console.log('inside test environment');
    process.env.PORT=3000;
    process.env.MONGODB_URI="mongodb://localhost:27017/demotodoapp";
}
if(env==='development'){
    console.log('inside development environment');
    process.env.PORT=3000;
    process.env.MONGODB_URI="mongodb://localhost:27017/TodoApp";
}else{ if(env===env)
{   console.log('inside test environment');
    process.env.PORT=3000;
    process.env.MONGODB_URI="mongodb://localhost:27017/demotodoapp";
}else if(env==='production'){
    console.log('inside production environment');
    process.env.PORT=3000;
}}
console.log('inside noo environment');
