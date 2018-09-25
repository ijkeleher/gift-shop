import React, { Component } from 'react';

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

    if( (username.localeCompare("admin") === 0) && (password.localeCompare("admin") === 0)){
      localStorage.setItem("isLoggedIn", true)
    }
    else{
      localStorage.clear();
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
  }

  renderLogin = () =>{
    return [
      (this.state.showLoginMenu &&
        <form className="admin-login-form" onSubmit={this.logIn} key={1}>
          <input type="text" autocomplete="off" placeholder="username" id="username"/>
          <input type="password" autocomplete="off" placeholder="password" id="password"/>
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
