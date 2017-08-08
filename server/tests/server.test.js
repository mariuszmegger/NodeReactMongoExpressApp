const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

// TODOS --------------------------------------------------------------------------------------

describe('POST /todos', () => {
  it('Should save one todo to database', (done) => {

    var text = 'Test todo text';

    request(app)
      .post("/todos")
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => {
          done(err);
        })
      });
    });

    it('Should not save one todo to database when data fails', (done) => {

      var text = {};

      request(app)
        .post("/todos")
        .set('x-auth', users[0].tokens[0].token)
        .send(text)
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((err) => {
            done(err);
          })
        });
      });
});


describe('GET /todos', () => {
  it('Should get all todos of the specyfic user', (done) => {
    request(app)
      .get("/todos")
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
      })
      .end(done);
    });
});

describe('GET /todos/:id', () => {
  it('Should get one specyfic todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
    });

    it('Should not return todo doc created by other user', (done) => {
      request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth', users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if todo not found', (done) => {
      var hexId = new ObjectID().toHexString();

      request(app)
        .get(`/todos/${hexId}`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('Should return 404 for non-object ids', (done) => {
      request(app)
        .get('/todos/4325')
        .set('x-auth', users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/delete/:id', () => {
  it('Should delete todo when id and creator is valid', (done) => {
    request(app)
      .delete(`/todos/delete/${todos[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findOne({_id: res.body._id}).then((todo) => {
          expect(todo).toNotExist();
          done()
        }).catch((e) => done(e))
      });
  });

  it('Should not delete when creator is invalid ', (done) => {
    request(app)
      .delete(`/todos/delete/${todos[0]._id}`)
      .set('x-auth', users[1].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('Should not delete todo and return 404 when id is valid but todo not exists', (done) => {
    let objectId = new ObjectID();

    request(app)
      .delete(`/todos/delete/${objectId}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });

  it('Should not delete todo and return 404 when id is invalid', (done) => {
    request(app)
      .delete(`/todos/delete/123`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/update/:id', () => {
  it('Should update todo when id and creator is valid - changed text, completed true', (done) => {
    let text = 'newText';
    let completed = true;
    request(app)
      .patch(`/todos/update/${todos[0]._id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send({
        text,
        completed
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(completed);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done)
  });

  it('Should update todo when id and creator is valid - changed text, completed false', (done) => {
    let text = 'newText';
    let completed = false;
    request(app)
      .patch(`/todos/update/${todos[1]._id}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text,
        completed
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(completed);
        expect(res.body.todo.completedAt).toBe(null);
      })
      .end(done)
  });

  it('Should not update todo when creator is inValid ', (done) => {
    let text = 'newText';
    let completed = true;
    request(app)
      .patch(`/todos/update/${todos[0]._id}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text,
        completed
      })
      .expect(404)
      .end(done)
  });

  it('Should not update todo when it not exists ', (done) => {
    let objectId = new ObjectID();
    let text = 'newText';
    let completed = true;
    request(app)
      .patch(`/todos/update/${objectId}`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text,
        completed
      })
      .expect(404)
      .end(done)
  });

  it('Should not update todo when id is invalid ', (done) => {
    let text = 'newText';
    let completed = true;
    request(app)
      .patch(`/todos/update/123`)
      .set('x-auth', users[1].tokens[0].token)
      .send({
        text,
        completed
      })
      .expect(404)
      .end(done)
  });
});

// USERS --------------------------------------------------------------------------------------

describe('POST /users/register', () => {
  it('Should create new user', (done) => {
    let email = 'example3@example.com';
    let password = 'abc123';

    request(app)
      .post(`/user/register`)
      .send({
        email,
        password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => done(e));
      });
    });

    it('Should not create new user if validation failed (password)', (done) => {
      let email = 'example3@example.com';
      let password = 'ab';

      request(app)
        .post(`/user/register`)
        .send({
          email,
          password,
        })
        .expect(400)
        .end(done);
    });

    it('Should not create new user if validation failed (email)', (done) => {
      let email = 'example3';
      let password = 'abc123';

      request(app)
        .post(`/user/register`)
        .send({
          email,
          password,
        })
        .expect(400)
        .end(done);
    });

    it('Should not create new user if the same email exists in database', (done) => {
      let password = 'abc123';

      request(app)
        .post(`/user/register`)
        .send({
          email: users[0].email,
          password
        })
        .expect(400)
        .end(done);
    });
  });

  describe('POST /user/login', () => {
    it('Should login user', (done) => {
      request(app)
        .post(`/user/login`)
        .send({
          email: users[1].email,
          password: users[1].password
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe(users[1].email);
          expect(res.headers['x-auth']).toExist();
          expect(res.headers['x-auth']).toNotBe(users[1].tokens.token);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          User.findById(users[1]._id).then((user) => {
            expect(user.tokens[1]).toInclude({
              access: 'auth',
              token: res.headers['x-auth']
            });
            done();
          }).catch((e) => done(e));
        });
    });

    it('Should not login user if credentials not expected', (done) => {
      request(app)
        .post(`/user/login`)
        .send({
          email: users[1].email,
          password: users[0].password
        })
        .expect(400)
        .end(done);
    });
  });

  describe('DELETE /user/logout', () => {
    it('Should Logout user and destory a token', (done) => {
      request(app)
        .delete(`/user/logout`)
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end((err, res) =>{
          if (err) {
            return done(err);
          }

          User.findById(users[0]._id).then((user) => {
            expect(user.tokens.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
    });
  })
