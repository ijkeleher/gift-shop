import React, { Component } from 'react';

class AdminLogin extends Component {

  logOut = () =>{
    localStorage.clear();
  }

  logIn = () =>{

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    if( (username.localeCompare("admin") === 0) && (password.localeCompare("admin") === 0)){
      localStorage.setItem("isLoggedIn", true)
      console.log("local storage in check is: " + localStorage.getItem("isLoggedIn"));
      this.props.login(true);

    }
    else{
      localStorage.setItem("isLoggedIn", false)
    }
  }

  render() {
    const loggedIn = localStorage.getItem("isLoggedIn");

    return(       
      <div>
        {loggedIn===null || loggedIn===false ? (
          <form onSubmit={this.logIn}>
            <input type="text" placeholder="username" id="username"/>
            <input type="password" placeholder="password" id="password"/>
            <button>Login</button>
          </form>
        ):
        (
          <div>
            <div className="logged-in">Logged in as Admin</div>
            <form onSubmit={this.logOut}>
              <button>Logout</button>
            </form>
          </div>          
        )}
      </div>
    );
  }
}

export default AdminLogin;