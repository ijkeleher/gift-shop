import React, { Component } from 'react';
import Alert from 'react-s-alert';
import '../containers/DefaultAlertStyle.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

const admins = ["Jack","Cass","Claudia","Inci","Reza"];

class AdminLogin extends Component {

  state=({
    showLoginMenu: false
  });

  logOut = () =>{
    localStorage.clear();
  }

  logIn = () =>{

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  //  var admins = ["Jack","Cass","Claudia","Inci","Reza"];

    for (var i = 0; i < admins.length; i++) {
      if( (username.localeCompare(admins[i]) === 0) && (password.localeCompare("admin") === 0)){
        localStorage.setItem("isLoggedIn", true);
      }
      /*else{
        localStorage.clear();
      }*/
    }
  }

  showLoginMenu = () => {
    console.log("its been clicked");
    if(this.state.showLoginMenu === false){
      this.setState({
        showLoginMenu: true
      });
    }
    else{
      this.setState({
        showLoginMenu: false
      });
    }
  }

  recoverPassword = (e) => {
    e.preventDefault();
    var username = document.getElementById("username").value;
    console.log(username);

    if( (username.localeCompare("") === 0)) {
      Alert.info(`Please enter a username.`,
        {effect: 'jelly', position: 'top'});
    } else {
      for (var i = 0; i < admins.length; i++) {
        if( (username.localeCompare(admins[i]) === 0)){
          // Send e-mail
        }
      }
      Alert.info(`If a matching username is found a corresponding e-mail will be sent.`,
        {effect: 'jelly', position: 'top'});
    }
  }

  renderLogin = () =>{
    return [
      (this.state.showLoginMenu &&
        <form className="admin-login-form" onSubmit={this.logIn} key={1}>
          <input type="text" autoComplete="off" placeholder="username" id="username"/>
          <input type="password" autoComplete="off" placeholder="password" id="password"/>
          <button>Login</button>
          <button className="forgotPassword" onClick={this.recoverPassword}>Forgot your password?</button>
        </form>)
    ];
  }

  render() {
    const loggedIn = localStorage.getItem("isLoggedIn");

    return(
      <div>

        {(loggedIn===null || loggedIn===false) ? (
          <div>
            <button className="admin-login-button" onClick={this.showLoginMenu}>Admin Login</button>
            <div className="admin-login">{this.renderLogin()}</div>
          </div>
        ):
        (
          <div>
            <div className="logged-in">Logged in as Admin</div>
            <form onSubmit={this.logOut}>
              <button className="log-out-button">Log out</button>
            </form>
          </div>
        )}

      </div>
    );
  }
}

export default AdminLogin;
