require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const moment = require('moment');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.status(200).send();
})

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    creator: ObjectID(req.user._id)
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/all/:completed', authenticate, (req, res) => {
  let {completed} = req.params;
  if(completed && completed !== 'xxx'){
    Todo.find({creator: req.user._id, completed: completed}).then((todos) => {
      var todos = todos.map((todo) => {
        var todo = {
          createdAt: moment(todo._id.getTimestamp()).format('DD/MM/YYYY'),
          _id:todo._id,
          completed: todo.completed,
          completedAt: todo.completedAt,
          text:todo.text,
          creator: todo.creator
        };
        return todo;
      })
      res.status(200).send({todos});
    }).catch(() => {
      req.status(400).send();
    })
  }else{
    Todo.find({creator: req.user._id}).then((todos) => {
      var todos = todos.map((todo) => {
        var todo = {
          createdAt: moment(todo._id.getTimestamp()).format('DD/MM/YYYY'),
          _id:todo._id,
          completed: todo.completed,
          completedAt: todo.completedAt,
          text:todo.text,
          creator: todo.creator
        };
        return todo;
      })
      res.status(200).send({todos});
    }).catch(() => {
      req.status(400).send();
    })
  }

});

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOne({
    _id: id,
    creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/delete/:id', authenticate, (req,res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findOneAndRemove({_id: id, creator: req.user._id}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send(todo);
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/update/:id', authenticate, (req,res) => {
  var body = _.pick(req.body, ['text', 'completed']);
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completedAt = null;
    body.completed = false
  }

  Todo.findOneAndUpdate({_id: id, creator: req.user._id}, {$set: body}, {new: true, runValidators: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

});


// POST /users
app.post('/user/register', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  var userData;
  user.save().then((doc) => {
    userData = doc;
    return user.generateAuthToken(true);

  }).then((token)=>{

    if(token){
      res.header('x-auth', token).status(200).send({token, userData});
    }
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);
  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken(false).then((token) => {
      res.header('x-auth', token).send({user, token});
    });
  }).catch((e) => {
      res.status(400).send();
  });
})

app.delete('/user/logout', authenticate, (req,res) => {
  return req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch(() => {
    res.status(400).send();
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
