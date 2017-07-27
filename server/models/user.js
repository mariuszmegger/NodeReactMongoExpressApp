const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    _id: false
  }]
});

UserSchema.methods.generateAuthToken = function(){
  let user = this;
  let access  = 'auth';
  let token = jwt.sign({_id:user._id.toHexString(), access}, 'gffouypiugh').toString();
  user.tokens.push({access, token});
  return user.save().then(() =>{
    return token;
  }, (e) => {
    return e;
  });
}

UserSchema.statics.findByToken = function(token){
  let user = this;
  let decoded;
  try{
    decoded = jwt.verify(token, 'gffouypiugh');
  }catch(e){
    return Promise.reject()
  }

  return user.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
  });

  UserSchema.statics.findByCredentials = function(email, password){
    let user = this;
    user.find(email).then((user) => {
      if(!user){
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res){
            resolve(user)
          }else{
            reject();
          }
        });
      });
    });
  }


}



UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User}
