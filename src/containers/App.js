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
          <AdminLogin/>
        </div>
      </Provider>
    )
  }
}

export default App;
