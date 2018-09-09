import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';


import Shelf from '../components/shelf/Shelf';
import Footer from '../components/Footer';
import FloatCart from './../components/floatCart/FloatCart';
import Checkout from '../components/Checkout';

import store from '../store';
import Corner from '../components/github/Corner';
import AdminLogin from '../components/AdminLogin';
import Facebook from '../components/Facebook';
import Google from '../components/Google';

import Alert from 'react-s-alert';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Corner />
          <Checkout />
          <main>
            <Shelf />
          </main>
          <Footer />
          <FloatCart />
          <div>
            <span>
              {this.props.children}
            </span>
            <Alert stack={{limit: 3}} />
          </div>
          

          <AdminLogin/>
        </div>
      </Provider>
    )
  }
}

export default App;
