import React, { Component } from 'react';
import './App.css';

import { Provider } from 'react-redux';


import Shelf from '../components/shelf/Shelf';
import Footer from '../components/Footer';
import FloatCart from './../components/floatCart/FloatCart';

import store from '../store';
import Corner from '../components/github/Corner';

import Alert from 'react-s-alert';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Corner />
          <main>
            <Shelf />
          </main>
          <Footer />
          <FloatCart />
          /* default alert template */
          <div>
            <span>
              {this.props.children}
            </span>
            <Alert stack={{limit: 3}} />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App;
