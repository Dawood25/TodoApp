const expect=require('expect');
const request =require('supertest');
require('./../../config')
const {ObjectID}=require('mongodb');
const {app}=require('./../server');
const{User}=require('./../model/user');
const {todo}=require('./../model/todo');
const {todoss,populateTodos,users,populateUsers}=require('./seed');

beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos',()=>{
   
    it('should create a new todo',(done)=>{
        var text="hello from the test";
              request(app).post('/todos').set('x-auth',users[0].tokens[0].token).send({text}).expect(200).expect(
            (res)=>{
                expect(res.body.text).toBe(text);
            }).end((err,res)=>{
                if(err){
                    return done(err);
                }
                todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=>done(e));
            });
    });

    it("should not create the new todo",(done)=>{
        request(app).post('/todos').send({}).set('x-auth',users[0].tokens[0].token).expect(400).end((err,res)=>{
            if(err){
                return done(err);
            }
            todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done(); 
            }).catch((e)=>done(e));
        })
    });


    it("should return the todos list", (done)=>{
        request(app).get('/gettodos').set('x-auth',users[0].tokens[0].token).expect(200).expect((res)=>{
            expect(res.body.todos.length).toBe(1);
        }).end((err,res)=>{
            if(err){
                return done(err);
            }
            todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                expect(todos[0].text).toBe("First test todo");
                expect(todos[1].text).toBe("second test todo");
                done();
            }).catch((e)=>done(e));
        })
    })
});



describe("GET /todos/id",()=>{
    it('should return todo doc',(done)=>{
        request(app).get(`/getonetodo/${todoss[0]._id.toHexString()}`).set('x-auth',users[0].tokens[0].token).expect(200).expect((res)=>{
            expect(res.body.todos.text).toBe(todoss[0].text);
        }).end(done);
    });
    it("should return todo to the creator of that todo",(done)=>{
        request(app).get(`/getonetodo/${todoss[0]._id.toHexString()}`).set('x-auth',users[1].tokens[0].token).expect(404).end(done);
    });
    it('should return 400 no user id ', (done)=>{
        request(app).get('/getonetodo/123').set('x-auth',users[0].tokens[0].token).expect(400).expect((res)=>{
            //expect(res.body).toBe("your id is invalid");
        }).end(done);
    });

    it('should return 404 no user id found in the database',(done)=>{
        let text=new ObjectID().toHexString();
        request(app).get(`/getonetodo/${text}`).set('x-auth',users[0].tokens[0].token).expect(404).expect((res)=>{
            //expect(res.body).toBe('there is no todos');
        }).end(done);
    })
});


describe("delete /todos/id",()=>{
    it('shoould delete todo from the collection',(done)=>{
        request(app).delete(`/delete/${todoss[0]._id.toHexString()}`).set('x-auth',users[0].tokens[0].token).expect(200).expect((res)=>{
            expect(res.body.todo.text).toBe(todoss[0].text);
        }).end((err,res)=>{
            if(err){
                return done(err);
            }
            todo.findById(todoss[0]._id.toHexString()).then((todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch((e)=>done(e));
        });
    });
    it("should return 404 id not found",(done)=>{
        request(app).delete(`/delete/${todoss[1]._id.toHexString()}`).set('x-auth',users[0].tokens[0].token).expect(404).end(done);
    })
    it("should return 404 id is invalid",(done)=>{
        request(app).delete('/delete/123').set('x-auth',users[0].tokens[0].token).expect(404).end(done);
    });
    it("should return 404 no user id found",(done)=>{
        let text=new ObjectID().toHexString();
        request(app).delete(`/delete/${text}`).set('x-auth',users[0].tokens[0].token).expect(404).end(done);
    })
});


describe("PATCH /update/id",()=>{
    it("should update the completed at value when completed is true",(done)=>{
        request(app).patch(`/update/${todoss[0]._id.toHexString()}`).set('x-auth',users[0].tokens[0].token).send({completed:true}).expect(200).expect((res)=>{
            expect(res.body.todo.completed).toBe(true);
        }).end((err,res)=>{
            todo.findById(todoss[0]._id.toHexString()).then((todo)=>{
               expect(todo.completed).toBe(true);
               expect(todo.completedAt).toExist();
               done(); 
            }).catch((e)=>{
                done(e);
            });
        });
    });

    it("should should not update the completed at value when completed is true and creator is different",(done)=>{
        request(app).patch(`/update/${todoss[0]._id.toHexString()}`).set('x-auth',users[1].tokens[0].token).send({completed:true}).expect(404).end(done)
        });
    

});


describe("GET /user/me",()=>{
        it("should return if user is authenticated",(done)=>{
                request(app).get('/user/me').set('x-auth',users[0].tokens[0].token).expect(200).expect((res)=>{
                    //expect(res.body._id).toBe(users[0]._id.toHexString());
                    expect(res.body.email).toBe(users[0].email);
                }).end(done)
        });
        it("should return 401 user is not authenticated",(done)=>{
            request(app).get("/user/me").expect(401).end(done);
        })
})

describe("POST /signup",()=>{
        it("should create a user",(done)=>{
            let email="exapmle@example.com";
            let password="1234567";
            request(app).post("/signup").send({email,password}).expect(200).expect((res)=>{
                expect(res.headers['x-auth']).toExist();
                expect(res.body.email).toBe(email);
            }).end(done);
        });
        it("should return validation error if request is invalid",(done)=>{
            let email="jen@example.com";
            let password="1567";
            request(app).post("/signup").send({email,password}).expect(400).expect((res)=>{
                
            }).end(done);
        });
        // it("should not create user if email is already in user",(done)=>{
            
        // })
});
    //same one test case for invalid id and one for id not found and one when completed is not true.
describe("POST/ user/login",()=>{
      it("should return a valid x auth token",(done)=>{
            let email=users[1].email;
            let password=users[1].password;
            request(app).post("/user/login").send({email,password}).expect(200).expect((res)=>{
                expect(res.body.email).toBe(email);
                expect(res.headers['x-auth']).toExist();
            }).end((err,res)=>{
                if(err){
                   return done(err);
                }
                User.findOne({email:users[1].email}).then((user)=>{

                 //   console.log(user.tokens[0]);
                    expect(user.toObject().tokens[1]).toContain({
                        access:"auth",
                        token:res.headers['x-auth']
                    })
                    // expect(user.tokens[0]).toInclude({
                        
                    // });
                    done();
                }).catch((e)=>done(e));
            });
      });
      it("should return a error that x-auth token is not present",(done)=>{
        let email="usertwo@example.com";
        let password="usertwopass1";
        request(app).post("/user/login").send({email,password}).expect(400).end(done);
      }); 
});     

describe("DELETE /user/me/token",()=>{
    it("should delete the auth token",(done)=>{
        request(app).delete("/user/me/token").set('x-auth',users[0].tokens[0].token).expect(200).end((err,res)=>
        {
            if(err){
                return done(err)
            }
         User.findOne({email:users[0].email}).then((user)=>{
             expect(user.tokens.length).toBe(0);
             done()
         }).catch((e)=>done(e))   
        })
    })
});