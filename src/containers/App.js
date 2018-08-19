import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';


import Shelf from '../components/shelf/Shelf';
import Footer from '../components/Footer';
import FloatCart from './../components/floatCart/FloatCart';

import store from '../store';
import Corner from '../components/github/Corner';
import AdminLogin from '../components/AdminLogin';


class App extends Component {

  state = {
    admin: false
  } 
  isLoggedIn = (boolean) => {
    this.setState({
      admin: boolean
    })
  }

  render() {
    const loggedIn = this.state.admin;
    let greeting;
    console.log("admin is " + loggedIn);
    if(loggedIn){
        greeting = <div>LOGGED IN</div>
    }
    return (
      <Provider store={store}>
        <div className="App">
          <Corner />
          <main>
            <Shelf />
          </main>
          <Footer />
          <FloatCart />
          <AdminLogin login={this.isLoggedIn}/>
          {greeting}
        </div>
      </Provider>
    )
  }
}

export default App;
