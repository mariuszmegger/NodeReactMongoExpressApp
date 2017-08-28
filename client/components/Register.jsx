import React from 'react';
import UserAPI from 'UserAPI';
import Nav from 'Nav'

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  onSubmit(e){
    e.preventDefault();
    let userAPI = new UserAPI();
    userAPI.registerUser(this.refs.email.value, this.refs.password.value).then((res) => {
      console.log(res);
      if(!res){
        throw new Error();
      }
      // let nav = new Nav()
      // nav.forceToUpdate();
    }).catch((e) => {
      alert('Fix error user can not be created', e)
    })
  }
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form ref="form" onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" ref="email"/>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" ref="password"/>
              </div>
              <button type="submit" className="btn btn-default">Register</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.defaultProps = {

};

Register.propTypes = {

}
export default Register;
