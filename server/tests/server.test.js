const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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
