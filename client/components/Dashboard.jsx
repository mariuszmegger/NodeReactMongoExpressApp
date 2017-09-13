import React from 'react';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mainContainer dashboardContainer">
            <div className="page-header">
              <h2>Application Info </h2>
            </div>
              <p>Application was created to show some of my skills in MEAN stack.</p>
              <p>It's not fully finished to be ready for production.</p>
              <h4>Technologies used:</h4>
              1. <b>Backend</b>
              <ul>
                <li>Node JS</li>
                <li>Express</li>
                <li>JWT</li>
              </ul>
              2. <b>Database</b>
              <ul>
                <li>MongoDB</li>
                <li>Moongose</li>
              </ul>
              3. <b>Frontend</b>
              <ul>
                <li>React</li>
                <li>Redux</li>
                <li>jQuery</li>
                <li>Bootstrap 3</li>
                <li>SASS</li>
              </ul>
              4. <b>Testing</b>
              <ul>
                <li>Mocha</li>
                <li>Expect</li>
              </ul>
              5. <b>Other</b>
              <ul>
                <li>Git</li>
                <li>Webpack</li>
              </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
