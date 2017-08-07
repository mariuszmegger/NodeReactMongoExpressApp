const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: 'user1@example.com',
    password: 'userOnePassword',
    tokens: [
      {
        access:'auth',
        token: jwt.sign({_id:userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: 'user2@example.com',
    password: 'userTwoPassword',
    tokens: [
      {
        access:'auth',
        token: jwt.sign({_id:userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
      }
    ]
  }
]

const todos = [
  {
    _id: new ObjectID(),
    text: 'First test todo',
    creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: 'Second test todo',
    creator: userTwoId,
    completed: true,
    completedAt: 555
  }
]

const populateUsers = function(done){
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

const populateTodos = function(done){
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

module.exports = {todos, populateTodos, users, populateUsers};
