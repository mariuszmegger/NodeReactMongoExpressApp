require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});


// POST /users
app.post('/user/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then((doc) => {
    return user.generateAuthToken(true);
  }).then((token)=>{
    if(token){
      res.header('x-auth', token).res.send(doc);
    }
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken(false).then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
      res.status(400).send();
  });
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
