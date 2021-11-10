import React, { Component } from "react";
import { connect } from "react-redux";
import logo from '../logo.svg';
import { userLogin } from '../redux/actions/userAction';

class Home extends Component {
  render(){
    const { userLoginAction } = this.props;
    // console.log("ccc", this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button
            onClick={() => {
              userLoginAction(
                {
                  username: 'dummy',
                  password: 'dummy'
                }
              )
            }}
          >
              click
          </button>
        </header>
      </div>
    );
  }
}

// export default Home;
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapActionsToProps = {
  userLoginAction: userLogin
};

export default connect(mapStateToProps,mapActionsToProps)(Home);