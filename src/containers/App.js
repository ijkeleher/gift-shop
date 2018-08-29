import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';


import Shelf from '../components/shelf/Shelf';
import Footer from '../components/Footer';
import FloatCart from './../components/floatCart/FloatCart';
import Checkout from '../components/Checkout';

import store from '../store';
import Corner from '../components/github/Corner';


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
        </div>
      </Provider>
    )
  }
}

export default App;
