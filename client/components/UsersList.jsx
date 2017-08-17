import React from 'react';

class UsersList extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Active Users List</h3>
              <table className="table table-bordered table-hovered">
                <thead>
                  <tr>
                    <td>Id</td>
                    <td>Email</td>
                    <td>Register Date</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>example@example.com</td>
                    <td>17.08.2017</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>example2@example.com</td>
                    <td>18.08.2017</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

UsersList.defaultProps = {

};

UsersList.propTypes = {

}
export default UsersList;
