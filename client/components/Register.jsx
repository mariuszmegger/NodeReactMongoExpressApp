import React from 'react';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
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
