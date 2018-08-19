import React, { Component } from 'react';

class AdminLogin extends Component {

  checkLoggedIn = (e) => {
    e.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log("username is: " + username);
    console.log("password is: " + password);

    if( (username.localeCompare("admin") === 0) && (password.localeCompare("admin") === 0)){
      this.props.login(true);
    }
  }
  render() {    
    return(       
      <div>
        <form onSubmit = {this.checkLoggedIn}>
          <input type="text" placeholder="username" id="username"/>
          <input type="password" placeholder="password" id="password"/>
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default AdminLogin;